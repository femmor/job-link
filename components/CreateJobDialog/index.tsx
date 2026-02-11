"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FormEvent, useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
    onJobCreated: () => void;
}

export function CreateJobApplicationDialog({ columnId, boardId, onJobCreated }: CreateJobApplicationDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        salary: "",
        jobUrl: "",
        tags: "",
        description: "",
        notes: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const result = await createJobApplication({
                ...formData,
                boardId,
                columnId,
                tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
            });

            if (!result.success) {
                onJobCreated();
                // Reset form after submission
                setFormData({
                    company: "",
                    position: "",
                    location: "",
                    salary: "",
                    jobUrl: "",
                    tags: "",
                    description: "",
                    notes: ""
                });
                setOpen(false);
            } else {
                console.error("Error creating job application:", result.error);
            }


        } catch (error) {
            console.error("Error creating job application:", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Plus /> Add a Job
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Job</DialogTitle>
                </DialogHeader>
                {/* Form fields for creating a job application would go here */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-2">
                                <Label htmlFor="company" className="text-gray-700 mb-2">
                                    Company
                                </Label>
                                <Input
                                    id="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Enter the company"
                                    required
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                            <div className="mb-2">
                                <Label htmlFor="position" className="text-gray-700 mb-2">
                                    Position
                                </Label>
                                <Input
                                    id="position"
                                    type="text"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    placeholder="Enter the position"
                                    required
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                            <div className="mb-2">
                                <Label htmlFor="location" className="text-gray-700 mb-2">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g New York, Remote"
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                            <div className="mb-2">
                                <Label htmlFor="salary" className="text-gray-700 mb-2">
                                    Salary
                                </Label>
                                <Input
                                    id="salary"
                                    type="text"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    placeholder="e.g $60,000 - $80,000"
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="my-4">
                                <Label htmlFor="jobUrl" className="text-gray-700 mb-2">
                                    Job URL
                                </Label>
                                <Input
                                    id="jobUrl"
                                    type="text"
                                    value={formData.jobUrl}
                                    onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                                    placeholder="https://www.example.com/job"
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                            <div className="my-4">
                                <Label htmlFor="tags" className="text-gray-700 mb-2">
                                    Tags
                                </Label>
                                <Input
                                    id="tags"
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="e.g JavaScript, React, Node.js"
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                            <div className="my-4">
                                <Label htmlFor="description" className="text-gray-700 mb-2">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter a brief description of the job"
                                    rows={4}
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                            <div className="my-4">
                                <Label htmlFor="notes" className="text-gray-700 mb-2">
                                    Notes
                                </Label>
                                <Textarea
                                    id="notes"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Any additional notes about the job"
                                    rows={3}
                                    className="border-gray-300 focus:border-default focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
}