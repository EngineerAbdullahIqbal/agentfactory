import React, { useState } from "react";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";
import type { SectionName, ProfileResponse } from "@/lib/learner-profile-types";
import { SECTION_CONFIGS } from "@/lib/learner-profile-types";
import { Pencil, Check, Loader2, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileSectionCardProps {
  section: SectionName;
  ViewComponent: React.ComponentType<{ data: unknown }>;
  EditComponent: React.ComponentType<{
    data: unknown;
    onChange: (data: unknown) => void;
    fieldSources?: Record<string, string>;
  }>;
}

export function ProfileSectionCard({
  section,
  ViewComponent,
  EditComponent,
}: ProfileSectionCardProps) {
  const { profile, updateSection } = useLearnerProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<unknown>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = SECTION_CONFIGS[section];
  const sectionData = profile?.[section as keyof ProfileResponse];

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setEditData(JSON.parse(JSON.stringify(sectionData)));
      setError(null);
    }
    setIsOpen(open);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateSection(section, editData);
      setIsOpen(false);
      setEditData(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save changes";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col border-border/50 bg-card/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-border transition-colors transition-shadow duration-300 group cursor-default relative overflow-hidden rounded-3xl">
        {/* Subtle top glare effect */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div>
            <CardTitle className="text-xl tracking-tight leading-none">
              {config.label}
            </CardTitle>
            <CardDescription className="mt-2 text-sm">
              {config.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(true)}
            className="rounded-full h-10 w-10 shrink-0 bg-accent/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={`Edit ${config.label}`}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 opacity-90 transition-opacity group-hover:opacity-100 pb-8">
          <ViewComponent data={sectionData} />
        </CardContent>
      </Card>

      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto border-l-border/50 bg-background/95 backdrop-blur-xl shadow-2xl p-0 flex flex-col">
          <SheetHeader className="p-6 md:p-8 space-y-2 border-b border-border/50 pb-6 shrink-0 bg-accent/10 text-left">
            <SheetTitle className="text-2xl">
              {config.label} Settings
            </SheetTitle>
            <SheetDescription className="text-base text-muted-foreground">
              {config.description}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
            {error && (
              <div
                className="mb-6 text-sm font-medium text-destructive bg-destructive/10 px-4 py-3 rounded-xl flex items-start gap-3"
                role="alert"
              >
                <div className="mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <span>{error}</span>
              </div>
            )}
            <div className="pb-24">
              <EditComponent
                data={editData}
                onChange={setEditData}
                fieldSources={profile?.field_sources}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none flex justify-end z-50">
            <div className="pointer-events-auto flex items-center gap-3 w-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-4">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSaving}
                className="rounded-xl flex-1 text-base h-12 border-2 border-border/50 hover:bg-accent hover:text-accent-foreground"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl flex-[2] shadow-lg shadow-primary/25 text-base h-12 font-semibold"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Check className="w-5 h-5 mr-2" />
                )}
                {isSaving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
