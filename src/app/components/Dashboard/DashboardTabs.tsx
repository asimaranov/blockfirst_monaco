'use client';

import { useState, ReactNode } from 'react';
import { Topbar } from '~/app/components/Dashboard/Topbar';

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type DashboardTabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  lastUpdate: string;
};

export function DashboardTabs({
  tabs,
  defaultTab,
  lastUpdate,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || tabs[0]?.id || ''
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <>
      <Topbar
        lastestUpdate={lastUpdate}
        items={tabs.map((tab) => ({
          label: tab.label,
          onClick: () => handleTabChange(tab.id),
          active: activeTab === tab.id,
        }))}
      />
      {activeTabContent}
    </>
  );
}
