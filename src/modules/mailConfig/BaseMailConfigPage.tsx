"use client";

import { MailConfigCard } from "@/src/modules/mailConfig/MailConfigCard";
import { PageBreadcrumb } from "@/src/shared/layout/PageBreadcrumb";
import { PageContainer } from "@/src/shared/layout/PageContainer";
import { PageHeader } from "@/src/shared/layout/PageHeader";

export default function BaseMailConfigPage() {
  return (
    <PageContainer>
      <PageBreadcrumb items={["Administração", "Config. de E-mail (Base)"]} />

      <PageHeader title="Configuração de E-mail — Base do Sistema" />

      <div className="max-w-3xl">
        <MailConfigCard scope="BASE" />
      </div>
    </PageContainer>
  );
}
