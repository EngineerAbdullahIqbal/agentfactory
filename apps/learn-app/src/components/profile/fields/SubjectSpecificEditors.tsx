import React, { useState } from "react";
import type {
  MasteredTopic,
  PartialTopic,
  Misconception,
} from "@/lib/learner-profile-types";
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

export function MasteredTopicsEditor({
  topics,
  onChange,
}: {
  topics: MasteredTopic[];
  onChange: (topics: MasteredTopic[]) => void;
}) {
  const [topic, setTopic] = useState("");
  const [treatment, setTreatment] = useState<MasteredTopic["treatment"]>(
    "reference",
  );

  const add = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    if (topics.length >= 50) return;
    onChange([...topics, { topic: trimmed.substring(0, 200), treatment }]);
    setTopic("");
    setTreatment("reference");
  };

  const updateItem = (index: number, patch: Partial<MasteredTopic>) => {
    onChange(topics.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  };

  const remove = (index: number) => {
    onChange(topics.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-medium">Topics You Already Know</div>
        <div className="text-xs text-muted-foreground">
          Mark topics as “skip” to avoid re-teaching them.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value.substring(0, 200))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a topic…"
          maxLength={200}
        />
        <Select
          value={treatment}
          onValueChange={(v) => setTreatment(v as MasteredTopic["treatment"])}
        >
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Treatment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reference">Reference</SelectItem>
            <SelectItem value="skip">Skip</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" onClick={add} disabled={!topic.trim()}>
          Add
        </Button>
      </div>

      {topics.length === 0 ? (
        <div className="text-sm text-muted-foreground">None added.</div>
      ) : (
        <div className="space-y-2">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center rounded-lg border border-border/50 bg-background/50 p-3"
            >
              <Input
                value={t.topic}
                onChange={(e) =>
                  updateItem(idx, { topic: e.target.value.substring(0, 200) })
                }
                maxLength={200}
              />
              <Select
                value={t.treatment}
                onValueChange={(v) =>
                  updateItem(idx, {
                    treatment: v as MasteredTopic["treatment"],
                  })
                }
              >
                <SelectTrigger className="sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reference">Reference</SelectItem>
                  <SelectItem value="skip">Skip</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(idx)}
                aria-label="Remove topic"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {topics.length >= 50 && (
        <p className="text-xs text-muted-foreground">
          Maximum 50 topics reached.
        </p>
      )}
    </div>
  );
}

export function PartialTopicsEditor({
  topics,
  onChange,
}: {
  topics: PartialTopic[];
  onChange: (topics: PartialTopic[]) => void;
}) {
  const [topic, setTopic] = useState("");

  const add = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    if (topics.length >= 20) return;
    onChange([...topics, { topic: trimmed.substring(0, 200), knowledge_state: "" }]);
    setTopic("");
  };

  const updateItem = (index: number, patch: Partial<PartialTopic>) => {
    onChange(topics.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  };

  const remove = (index: number) => {
    onChange(topics.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-medium">Topics You Partially Know</div>
        <div className="text-xs text-muted-foreground">
          Add what you already understand so we can build from there.
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value.substring(0, 200))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a topic…"
          maxLength={200}
        />
        <Button type="button" onClick={add} disabled={!topic.trim()}>
          Add
        </Button>
      </div>

      {topics.length === 0 ? (
        <div className="text-sm text-muted-foreground">None added.</div>
      ) : (
        <div className="space-y-3">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border/50 bg-background/50 p-3 space-y-2"
            >
              <div className="flex items-start gap-2">
                <Input
                  value={t.topic}
                  onChange={(e) =>
                    updateItem(idx, { topic: e.target.value.substring(0, 200) })
                  }
                  maxLength={200}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(idx)}
                  aria-label="Remove topic"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={t.knowledge_state}
                onChange={(e) =>
                  updateItem(idx, {
                    knowledge_state: e.target.value.substring(0, 300),
                  })
                }
                placeholder="What do you already know about it?"
                rows={3}
                maxLength={300}
              />
            </div>
          ))}
        </div>
      )}

      {topics.length >= 20 && (
        <p className="text-xs text-muted-foreground">
          Maximum 20 topics reached.
        </p>
      )}
    </div>
  );
}

export function MisconceptionsEditor({
  items,
  onChange,
}: {
  items: Misconception[];
  onChange: (items: Misconception[]) => void;
}) {
  const [topic, setTopic] = useState("");

  const add = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    if (items.length >= 5) return;
    onChange([...items, { topic: trimmed.substring(0, 200), misconception: "" }]);
    setTopic("");
  };

  const updateItem = (index: number, patch: Partial<Misconception>) => {
    onChange(items.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-medium">Known Misconceptions</div>
        <div className="text-xs text-muted-foreground">
          Optional — prevents the tutor from reinforcing wrong mental models.
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value.substring(0, 200))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a topic…"
          maxLength={200}
        />
        <Button type="button" onClick={add} disabled={!topic.trim()}>
          Add
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-muted-foreground">None added.</div>
      ) : (
        <div className="space-y-3">
          {items.map((t, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border/50 bg-background/50 p-3 space-y-2"
            >
              <div className="flex items-start gap-2">
                <Input
                  value={t.topic}
                  onChange={(e) =>
                    updateItem(idx, { topic: e.target.value.substring(0, 200) })
                  }
                  maxLength={200}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(idx)}
                  aria-label="Remove misconception"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={t.misconception}
                onChange={(e) =>
                  updateItem(idx, {
                    misconception: e.target.value.substring(0, 500),
                  })
                }
                placeholder="What misconception do you want to avoid?"
                rows={3}
                maxLength={500}
              />
            </div>
          ))}
        </div>
      )}

      {items.length >= 5 && (
        <p className="text-xs text-muted-foreground">
          Maximum 5 misconceptions reached.
        </p>
      )}
    </div>
  );
}

