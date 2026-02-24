/**
 * Remark Plugin: Messaging Channel Tabs
 *
 * Transforms clean markdown syntax into Docusaurus Tabs components
 * for channel-specific instructions (WhatsApp, Telegram, etc.).
 *
 * Usage in docusaurus.config.ts:
 *
 * remarkPlugins: [
 *   require('remark-directive'),  // Required first
 *   require('../../libs/docusaurus/remark-channel-tabs')
 * ]
 *
 * Markdown syntax (use 4 colons if nesting other containers inside):
 *
 * ::::channel-tabs
 *
 * ::whatsapp
 * WhatsApp-specific content here
 *
 * ::telegram
 * Telegram-specific content here
 *
 * ::::
 *
 * Transforms into:
 * <Tabs groupId="messaging-channels">
 *   <TabItem value="whatsapp" label="WhatsApp" default>
 *     WhatsApp-specific content here
 *   </TabItem>
 *   <TabItem value="telegram" label="Telegram">
 *     Telegram-specific content here
 *   </TabItem>
 * </Tabs>
 *
 * Note: Use 4 colons (::::channel-tabs) when nesting :::tip, :::warning, etc.
 * inside the tabs. The closing marker must match (::::).
 */

const { visit } = require("unist-util-visit");

// Channel configuration with labels and order
const CHANNEL_CONFIG = {
  whatsapp: { label: "WhatsApp", default: true },
  telegram: { label: "Telegram", default: false },
};

function remarkChannelTabs(options = {}) {
  const { groupId = "messaging-channels" } = options;

  return (tree) => {
    const nodesToTransform = [];

    // Find all containerDirective nodes with name 'channel-tabs'
    visit(tree, (node, index, parent) => {
      if (node.type === "containerDirective" && node.name === "channel-tabs") {
        nodesToTransform.push({ node, index, parent });
      }
    });

    // Transform each channel-tabs container
    nodesToTransform.forEach(({ node, index, parent }) => {
      const tabItems = [];

      // Process children to find ::whatsapp, ::telegram leaf directives
      let currentChannel = null;
      let currentContent = [];

      node.children.forEach((child) => {
        if (child.type === "leafDirective" && CHANNEL_CONFIG[child.name]) {
          // Save previous channel content if exists
          if (currentChannel) {
            tabItems.push({
              channel: currentChannel,
              children: currentContent,
            });
          }
          // Start new channel section
          currentChannel = child.name;
          currentContent = [];
        } else if (currentChannel) {
          // Add content to current channel section
          currentContent.push(child);
        }
      });

      // Don't forget the last channel section
      if (currentChannel && currentContent.length > 0) {
        tabItems.push({
          channel: currentChannel,
          children: currentContent,
        });
      }

      // Build the Tabs JSX structure
      const tabsNode = {
        type: "mdxJsxFlowElement",
        name: "Tabs",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "groupId",
            value: groupId,
          },
        ],
        children: tabItems.map(({ channel, children }) => {
          const config = CHANNEL_CONFIG[channel];
          const attributes = [
            {
              type: "mdxJsxAttribute",
              name: "value",
              value: channel,
            },
            {
              type: "mdxJsxAttribute",
              name: "label",
              value: config.label,
            },
          ];

          // Add default attribute for WhatsApp
          if (config.default) {
            attributes.push({
              type: "mdxJsxAttribute",
              name: "default",
              value: null,
            });
          }

          return {
            type: "mdxJsxFlowElement",
            name: "TabItem",
            attributes,
            children,
          };
        }),
      };

      // Replace the container with the Tabs component
      parent.children[index] = tabsNode;
    });
  };
}

module.exports = remarkChannelTabs;
