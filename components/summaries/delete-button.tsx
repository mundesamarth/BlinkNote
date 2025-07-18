"use client";

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

interface DeleteButtonProps {
    summaryId: string;
}

export default function DeleteButton({summaryId}: DeleteButtonProps) {
const [open, setOpen] = useState(false);
const [isPending,startTransition] = useTransition();

const handleDelete = async () => {
    startTransition(async () => {
    const result = await deleteSummaryAction({summaryId});
    if(!result.success){
       toast.error("Failed to delete summary",{
        className:"bg-red-500 text-white",
        icon:"❌"
       }) 
    }else{
      toast.success("Summary deleted successfully",{
        className:"bg-green-500 text-white",
        icon:"✅",
        duration: 3000,
       }) 
    }
    setOpen(false);
    });
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-purple-600 hover:bg-purple-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary?{" "}This action cannot be undone. 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button
            variant={"ghost"}
            className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
            onClick={()=>setOpen(false)}
          >Cancel
          </Button>
          <Button
            variant={"destructive"}
            className=" bg-gray-900 hover:bg-gray-600"
            onClick={handleDelete}
          >{isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
