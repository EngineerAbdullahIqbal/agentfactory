import React from "react";
import type {
  ProfessionalContextSection,
  RealProject,
} from "@/lib/learner-profile-types";
import { ChipSelect } from "@/components/profile/fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TOOLS_OPTIONS = [
  { value: "VS Code", label: "VS Code" },
  { value: "Cursor", label: "Cursor" },
  { value: "GitHub Copilot", label: "GitHub Copilot" },
  { value: "Claude", label: "Claude" },
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "Docker", label: "Docker" },
  { value: "AWS", label: "AWS" },
  { value: "Jira", label: "Jira" },
  { value: "Slack", label: "Slack" },
  { value: "Notion", label: "Notion" },
  { value: "Linear", label: "Linear" },
  { value: "Figma", label: "Figma" },
];

const ORG_TYPES = [
  { value: "", label: "Select…" },
  { value: "startup", label: "Startup" },
  { value: "enterprise", label: "Enterprise" },
  { value: "agency", label: "Agency" },
  { value: "freelance", label: "Freelance" },
  { value: "academic", label: "Academic" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "government", label: "Government" },
];

export function ProfessionalEdit({
  data,
  onChange,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  const ctx = data as ProfessionalContextSection;

  const update = (field: keyof ProfessionalContextSection, value: unknown) => {
    onChange({ ...ctx, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="settings-current-role" className="text-sm font-medium">
          Current Role
        </label>
        <Input
          id="settings-current-role"
          type="text"
          value={ctx?.current_role || ""}
          onChange={(e) =>
            update("current_role", e.target.value.substring(0, 100) || null)
          }
          placeholder="e.g. Senior Developer"
          maxLength={100}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="settings-industry" className="text-sm font-medium">
          Industry
        </label>
        <Input
          id="settings-industry"
          type="text"
          value={ctx?.industry || ""}
          onChange={(e) =>
            update("industry", e.target.value.substring(0, 100) || null)
          }
          placeholder="e.g. FinTech, Healthcare"
          maxLength={100}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="settings-org-type" className="text-sm font-medium">
          Organization Type
        </label>
        <Select
          value={ctx?.organization_type || "none"}
          onValueChange={(val) =>
            update("organization_type", val === "none" ? null : val)
          }
        >
          <SelectTrigger id="settings-org-type" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-muted-foreground">
              Select…
            </SelectItem>
            {ORG_TYPES.filter((opt) => opt.value !== "").map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="settings-team-context" className="text-sm font-medium">
          Team Context
        </label>
        <Select
          value={ctx?.team_context || "none"}
          onValueChange={(val) =>
            update("team_context", val === "none" ? null : val)
          }
        >
          <SelectTrigger id="settings-team-context" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-muted-foreground">
              Select…
            </SelectItem>
            <SelectItem value="solo">Solo / side project</SelectItem>
            <SelectItem value="small_team">Small team (2-10)</SelectItem>
            <SelectItem value="larger_team">Larger team (10+)</SelectItem>
            <SelectItem value="leading">Leading a team</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChipSelect
        label="Tools in Use"
        value={ctx?.tools_in_use || []}
        onChange={(tools) => update("tools_in_use", tools)}
        options={TOOLS_OPTIONS}
        maxSelect={20}
        maxItemLength={50}
        allowCustom
      />

      <RealProjectsEditor
        projects={ctx?.real_projects || []}
        onChange={(projects) => update("real_projects", projects)}
      />

      <div className="space-y-1.5">
        <label htmlFor="settings-constraints" className="text-sm font-medium">
          Constraints
        </label>
        <Textarea
          id="settings-constraints"
          value={ctx?.constraints || ""}
          onChange={(e) =>
            update("constraints", e.target.value.substring(0, 300) || null)
          }
          placeholder="Optional: e.g., limited cloud access, compliance, only 2 hours/week…"
          rows={3}
          maxLength={300}
        />
      </div>
    </div>
  );
}

function RealProjectsEditor({
  projects,
  onChange,
}: {
  projects: RealProject[];
  onChange: (projects: RealProject[]) => void;
}) {
  const addProject = () => {
    if (projects.length >= 5) return;
    onChange([...projects, { project_name: "", description: "" }]);
  };

  const updateProject = (
    index: number,
    patch: Partial<RealProject>,
  ) => {
    onChange(
      projects.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    );
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Real Projects</div>
          <div className="text-xs text-muted-foreground">
            Optional — helps personalize examples and workflows.
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addProject}
          disabled={projects.length >= 5}
        >
          Add
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No projects added.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border/50 bg-background/50 p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <label
                    htmlFor={`settings-project-name-${idx}`}
                    className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                  >
                    Project Name
                  </label>
                  <Input
                    id={`settings-project-name-${idx}`}
                    type="text"
                    value={project.project_name}
                    onChange={(e) =>
                      updateProject(idx, {
                        project_name: e.target.value.substring(0, 100),
                      })
                    }
                    placeholder="e.g., Internal support bot"
                    maxLength={100}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(idx)}
                  className="shrink-0"
                  aria-label="Remove project"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={`settings-project-desc-${idx}`}
                  className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                >
                  Description
                </label>
                <Textarea
                  id={`settings-project-desc-${idx}`}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(idx, {
                      description: e.target.value.substring(0, 500),
                    })
                  }
                  placeholder="1–2 sentences is plenty."
                  rows={3}
                  maxLength={500}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {projects.length >= 5 && (
        <p className="text-xs text-muted-foreground">
          Maximum 5 projects reached.
        </p>
      )}
    </div>
  );
}
