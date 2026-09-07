"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CoreCardProps = {
  title: string;
  divClass?: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
};

export default function CardComponent({
  title,
  divClass,
  content,
  actions,
}: CoreCardProps) {
  return (
    <div className={`flex ${divClass}`}>
      <Card className="m-6 w-full gap-0 pt-0">
        <CardHeader className="my-4 flex items-center justify-between">
          <CardTitle>{title}</CardTitle>

          <CardAction>{actions}</CardAction>
        </CardHeader>

        <Separator className="my-0" />

        <CardContent>{content}</CardContent>
      </Card>
    </div>
  );
}
