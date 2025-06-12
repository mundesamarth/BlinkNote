import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteButton() {
    return (
        <Button variant={"ghost"} size={"icon"} className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-purple-600 hover:bg-purple-50">
            <Trash2 className="w-4 h-4" />
        </Button>
    )
}