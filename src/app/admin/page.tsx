export default function AdminDashboard() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Панель управления</h1>
      </header>
      <main>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Promo Code Stats Card */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl">Промокоды для блогеров</h2>
            <p className="mb-4 text-gray-400">
              Создавайте и отслеживайте промокоды для блогеров, которые дают
              индивидуальные условия по реферальной программе.
            </p>
            <a
              href="/admin/promo-codes"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Управление промокодами
            </a>
          </div>

          {/* User Management Card */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl">Пользователи</h2>
            <p className="mb-4 text-gray-400">
              Управляйте пользователями платформы, просматривайте статистику и
              настраивайте права доступа.
            </p>
            <a
              href="/admin/users"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Управление пользователями
            </a>
          </div>

          {/* Referral Program Stats */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl">Реферальная программа</h2>
            <p className="mb-4 text-gray-400">
              Просматривайте статистику реферальной программы, анализируйте
              эффективность и настраивайте параметры.
            </p>
            <a
              href="#"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Статистика программы
            </a>
          </div>

          {/* Email Templates Preview */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            <h2 className="mb-4 text-xl">Шаблоны писем</h2>
            <p className="mb-4 text-gray-400">
              Просматривайте и тестируйте шаблоны писем, используемые платформой
              для коммуникации с пользователями.
            </p>
            <a
              href="/admin/email-previews"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Просмотр шаблонов
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
