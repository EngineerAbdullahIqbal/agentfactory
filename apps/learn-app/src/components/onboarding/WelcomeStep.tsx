import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Eye } from "lucide-react";
import { Label } from "@/components/ui/label";

interface WelcomeStepProps {
    onAgree: () => void;
    onDecline: () => void;
    isSaving: boolean;
}

export function WelcomeStep({ onAgree, onDecline, isSaving }: WelcomeStepProps) {
    const [consentGiven, setConsentGiven] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-primary/20">
                <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Set up your Learner Profile
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl">
                Personalize your learning experience in ~90 seconds. You can skip anything and adjust later.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-accent/50 rounded-2xl border border-border/40">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm border border-border/50">
                        <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">Better examples</h3>
                    <p className="text-sm text-muted-foreground">Contextual analogies based on your work.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-accent/50 rounded-2xl border border-border/40">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm border border-border/50">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">Right level</h3>
                    <p className="text-sm text-muted-foreground">Curriculum matched to your exact expertise.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-accent/50 rounded-2xl border border-border/40">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mb-3 shadow-sm border border-border/50">
                        <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">Accessible</h3>
                    <p className="text-sm text-muted-foreground">Formatting adapted to how you learn best.</p>
                </div>
            </div>

            <div className="flex items-start space-x-3 mb-10 text-left bg-accent/30 p-4 rounded-xl border border-border/40 w-full max-w-lg">
                <Checkbox
                    id="consent"
                    checked={consentGiven}
                    onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                    className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                    <Label
                        htmlFor="consent"
                        className="text-sm font-medium leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                        I agree to store my profile to personalize learning.
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        You can delete this data at any time from your profile settings.
                    </p>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center gap-4">
                <Button
                    onClick={onAgree}
                    disabled={!consentGiven || isSaving}
                    size="lg"
                    className="w-full sm:w-auto rounded-xl px-12 shadow-md shadow-primary/20 font-medium"
                >
                    {isSaving ? "Creating profile…" : "Agree & continue"}
                </Button>
                <Button
                    variant="link"
                    onClick={onDecline}
                    disabled={isSaving}
                    className="text-muted-foreground/80 hover:text-foreground no-underline hover:no-underline font-normal"
                >
                    Continue without personalization
                </Button>
            </div>
        </div>
    );
}
