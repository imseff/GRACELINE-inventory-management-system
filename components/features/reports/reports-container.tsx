"use client";

import { useState } from "react";
import { ReportsView } from "./reports-view";
import { FullOrderReport } from "./order-aggregate-table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function ReportsContainer() {
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  const handleViewReport = (id: string) => {
    setActiveReportId(id);
  };

  const handleClose = () => {
    setActiveReportId(null);
  };

  return (
    <div className="relative">
      {/* Base Layer: The Reports List */}
      <ReportsView onViewReport={handleViewReport} />

      {/* Overlay Layer: The Modal */}
      <Dialog open={!!activeReportId} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-[95vw] md:max-w-[80vw] lg:max-w-[1000px] h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-transparent shadow-none outline-none">
          <VisuallyHidden>
            <DialogTitle>Report Detail</DialogTitle>
            <DialogDescription>Viewing detailed aggregate report for {activeReportId}</DialogDescription>
          </VisuallyHidden>
          
          {/* We pass the handleClose to the report so the "Done" button works */}
          <FullOrderReport reportId={activeReportId || ""} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}