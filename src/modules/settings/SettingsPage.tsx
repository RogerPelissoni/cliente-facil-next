"use client";

import { useHasAuthority } from "@/src/modules/auth/auth.hooks";
import { MailConfigCard } from "@/src/modules/mailConfig/MailConfigCard";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";
import { ChangePasswordCard } from "./ChangePasswordCard";

export default function SettingsPage() {
  const canViewMailConfig = useHasAuthority("MAIL_CONFIG_VIEW");

  return (
    <PageContainer>
      <PageBreadcrumb items={["Configurações"]} />

      <PageHeader title="Configurações" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChangePasswordCard />

        {canViewMailConfig && <MailConfigCard />}
      </div>
    </PageContainer>
  );
}
