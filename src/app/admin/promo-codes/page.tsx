import PromoCodeManager from '~/app/components/admin/PromoCodeManager';

export default function PromoCodesAdminPage() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Управление промокодами</h1>
      </header>
      <main>
        <PromoCodeManager />
      </main>
    </div>
  );
}
