/**
 * Vue I18n configuration with supported locale messages.
 * Persisted locale is restored from localStorage on init.
 *
 * Fully translated: en, ka, ru, tr
 * Armenian (hy) and Kazakh (kk) fall back to English — contributions welcome.
 */

import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    menu: {
      dashboard: 'Dashboard',
      lab: 'Lab',
      assets: 'Assets',
      network: 'Network',
      game: 'Game'
    },
    dashboard: {
      sync: 'SYNCING...',
      hold: 'HOLD',
      rate: 'Rate',
      neural_pathway: 'Hold to synchronize neural pathways and validate transactions.'
    },
    syndicate: {
      title: 'Syndicate',
      agents: 'Agents',
      direct: 'Direct',
      lifetime: 'Lifetime'
    },
    home: {
      active_nodes: 'Active Nodes',
      tagline_top: 'The Future is',
      tagline_highlight: 'Decentralized',
      description: 'Join the global neural network. Validate transactions, secure the blockchain, and earn {token} tokens passively.',
      initialize: 'Initialize Node',
      initializing: 'Initializing...',
      connection_established: 'Secure Connection Established',
      audited: 'Audited',
      global: 'Global'
    },
    lab: {
      daily_income: 'Total Daily Income',
      monthly_projection: 'Monthly Projection',
      available: 'Available Infrastructure',
      unit_price: 'Unit Price',
      daily_revenue: 'Daily Revenue',
      tech_specs: 'Technical Specifications',
      architecture: 'Architecture',
      power: 'Power',
      efficiency: 'Efficiency',
      roi_estimator: 'ROI Estimator',
      roi_description: 'Break-even in approx {days}. Zero maintenance fees.',
      deploy: 'Deploy Unit for {price}',
      access_restricted: 'Access Restricted: Leaders Only',
      deployed: '+1 {name} deployed successfully'
    },
    assets: {
      wallet: 'Wallet',
      total_balance: 'Total Balance',
      updated: 'UPDATED JUST NOW',
      send: 'Send',
      receive: 'Receive',
      swap: 'Swap',
      scan: 'Scan',
      assets: 'Assets',
      manage: 'Manage',
      import_token: '+ Import Token',
      coming_soon: '{action} feature coming soon',
      token_locked: 'Token list is locked'
    },
    friends: {
      empire_growth: 'Empire Growth',
      dual_incentive: 'Dual Incentive System',
      tap_to_learn: 'Tap to learn how the Affiliate Program works.',
      copy_link: 'COPY INVITE LINK',
      link_copied: 'Syndicate Link Copied',
      total_earned: 'Total Earned',
      passive_flow: 'Passive Flow',
      top_operators: 'Top Operators',
      verified: 'VERIFIED',
      affiliate_title: 'Affiliate Logic',
      affiliate_desc: 'The Syndicate rewards you for expanding the network. Earnings are processed automatically via smart contracts.',
      direct_bonus: 'Direct Bonus (15%)',
      direct_bonus_desc: 'Receive 15% of the value of every Node purchased by your direct invites. Paid instantly.',
      lifetime_passive: 'Lifetime Passive (5%)',
      lifetime_passive_desc: 'Earn 5% of all COCO mined by your partners. This stream continues as long as their nodes are active.',
      rewards_note: 'Rewards are credited to your Assets wallet in real-time.',
      close: 'Close'
    },
    game: {
      net_idle: 'NET_IDLE',
      net_overload: 'NET_OVERLOAD',
      failure: 'FAILURE',
      uploading: 'UPLOADING',
      ready: 'READY',
      profit: 'PROFIT',
      previous: 'Previous Packets',
      stake: 'Stake (COCO)',
      retry: 'RETRY',
      eject: 'EJECT',
      upload: 'UPLOAD',
      win_message: 'Payload Uploaded! +{amount} COCO'
    },
    settings: {
      title: 'Settings',
      general: 'General',
      language: 'Language',
      select_language: 'Select Language',
      system: 'System',
      privacy: 'Privacy & Security',
      support: 'Coco Support',
      whitepaper: 'Whitepaper v1.0',
      restricted: '{action} is restricted in your region'
    },
    header: {
      welcome: 'Welcome back',
      online: 'ONLINE'
    },
    mining: {
      unlock_title: 'Unlock Auto-Miner',
      speed_limited: 'Limited',
      hardware_limit: 'Hardware Limit Reached',
      manual_inefficient: 'Manual Sync is Inefficient',
      manual_desc: 'Your biological input latency is limiting profit generation. Deploy a {node} to automate validation and increase yield by 500%.',
      current_speed: 'Current Speed',
      node_speed: 'Node Speed',
      get_node: 'Get Node Infrastructure'
    }
  },
  ka: {
    menu: {
      dashboard: 'მთავარი',
      lab: 'ლაბი',
      assets: 'აქტივები',
      network: 'ქსელი',
      game: 'თამაში'
    },
    dashboard: {
      sync: 'სინქრონიზაცია...',
      hold: 'დააჭირე',
      rate: 'კურსი',
      neural_pathway: 'გეჭიროს ნეირონული არხების სინქრონიზაციისა და ტრანზაქციების ვალიდაციისთვის.'
    },
    syndicate: {
      title: 'სინდიკატი',
      agents: 'აგენტები',
      direct: 'პირდაპირი',
      lifetime: 'მუდმივი'
    },
    home: {
      active_nodes: 'აქტიური კვანძები',
      tagline_top: 'მომავალი არის',
      tagline_highlight: 'დეცენტრალიზებული',
      description: 'შეუერთდი გლობალურ ნეირონულ ქსელს. დაადასტურე ტრანზაქციები, დაიცავი ბლოკჩეინი და გამოიმუშავე {token} ტოკენები პასიურად.',
      initialize: 'კვანძის ინიციალიზაცია',
      initializing: 'ინიციალიზაცია...',
      connection_established: 'უსაფრთხო კავშირი დამყარდა',
      audited: 'აუდიტირებული',
      global: 'გლობალური'
    },
    lab: {
      daily_income: 'დღიური შემოსავალი',
      monthly_projection: 'თვიური პროგნოზი',
      available: 'ხელმისაწვდომი ინფრასტრუქტურა',
      unit_price: 'ერთეულის ფასი',
      daily_revenue: 'დღიური შემოსავალი',
      tech_specs: 'ტექნიკური მახასიათებლები',
      architecture: 'არქიტექტურა',
      power: 'სიმძლავრე',
      efficiency: 'ეფექტურობა',
      roi_estimator: 'ROI კალკულატორი',
      roi_description: 'ანაზღაურება დაახლოებით {days}-ში. ნულოვანი მომსახურების საკომისიო.',
      deploy: 'განათავსე {price}-ად',
      access_restricted: 'წვდომა შეზღუდულია: მხოლოდ ლიდერებისთვის',
      deployed: '+1 {name} წარმატებით განთავსდა'
    },
    assets: {
      wallet: 'საფულე',
      total_balance: 'მთლიანი ბალანსი',
      updated: 'ახლახანს განახლდა',
      send: 'გაგზავნა',
      receive: 'მიღება',
      swap: 'გაცვლა',
      scan: 'სკანირება',
      assets: 'აქტივები',
      manage: 'მართვა',
      import_token: '+ ტოკენის იმპორტი',
      coming_soon: '{action} ფუნქცია მალე დაემატება',
      token_locked: 'ტოკენის სია დაბლოკილია'
    },
    friends: {
      empire_growth: 'იმპერიის ზრდა',
      dual_incentive: 'ორმაგი სტიმულის სისტემა',
      tap_to_learn: 'შეეხე პარტნიორული პროგრამის შესახებ ინფორმაციისთვის.',
      copy_link: 'მოწვევის ლინკის კოპირება',
      link_copied: 'სინდიკატის ლინკი დაკოპირდა',
      total_earned: 'სულ გამომუშავებული',
      passive_flow: 'პასიური ნაკადი',
      top_operators: 'ტოპ ოპერატორები',
      verified: 'დადასტურებული',
      affiliate_title: 'პარტნიორული ლოგიკა',
      affiliate_desc: 'სინდიკატი გაჯილდოებს ქსელის გაფართოებისთვის. შემოსავლები ავტომატურად მუშავდება სმარტ კონტრაქტებით.',
      direct_bonus: 'პირდაპირი ბონუსი (15%)',
      direct_bonus_desc: 'მიიღე შენი მოწვეულების ყოველი კვანძის შეძენის 15%. გადახდა მყისიერია.',
      lifetime_passive: 'მუდმივი პასიური (5%)',
      lifetime_passive_desc: 'გამოიმუშავე შენი პარტნიორების მიერ მოპოვებული COCO-ს 5%. ნაკადი გრძელდება მანამ, სანამ მათი კვანძები აქტიურია.',
      rewards_note: 'ჯილდოები რეალურ დროში ირიცხება შენს აქტივების საფულეში.',
      close: 'დახურვა'
    },
    game: {
      net_idle: 'ქსელი_უმოქმედო',
      net_overload: 'ქსელი_გადატვირთული',
      failure: 'წარუმატებელი',
      uploading: 'ატვირთვა',
      ready: 'მზადაა',
      profit: 'მოგება',
      previous: 'წინა პაკეტები',
      stake: 'ფსონი (COCO)',
      retry: 'თავიდან',
      eject: 'გასვლა',
      upload: 'ატვირთვა',
      win_message: 'ატვირთვა წარმატებით! +{amount} COCO'
    },
    settings: {
      title: 'პარამეტრები',
      general: 'ზოგადი',
      language: 'ენა',
      select_language: 'ენის არჩევა',
      system: 'სისტემა',
      privacy: 'კონფიდენციალურობა და უსაფრთხოება',
      support: 'Coco მხარდაჭერა',
      whitepaper: 'Whitepaper v1.0',
      restricted: '{action} შეზღუდულია თქვენს რეგიონში'
    },
    header: {
      welcome: 'გამარჯობა',
      online: 'ონლაინ'
    },
    mining: {
      unlock_title: 'ავტო-მაინერის გახსნა',
      speed_limited: 'შეზღუდული',
      hardware_limit: 'აპარატურის ლიმიტი მიღწეულია',
      manual_inefficient: 'ხელით სინქრონიზაცია არაეფექტურია',
      manual_desc: 'შენი ბიოლოგიური შეყვანის შეფერხება ზღუდავს მოგების გენერირებას. განათავსე {node} ვალიდაციის ავტომატიზაციისა და შემოსავლის 500%-ით გაზრდისთვის.',
      current_speed: 'მიმდინარე სიჩქარე',
      node_speed: 'კვანძის სიჩქარე',
      get_node: 'კვანძის ინფრასტრუქტურის მიღება'
    }
  },
  ru: {
    menu: {
      dashboard: 'Панель',
      lab: 'Лаборатория',
      assets: 'Активы',
      network: 'Сеть',
      game: 'Игра'
    },
    dashboard: {
      sync: 'СИНХРОНИЗАЦИЯ...',
      hold: 'УДЕРЖИВАЙ',
      rate: 'Курс',
      neural_pathway: 'Удерживайте для синхронизации нейронных путей и валидации транзакций.'
    },
    syndicate: {
      title: 'Синдикат',
      agents: 'Агенты',
      direct: 'Прямой',
      lifetime: 'Пожизненный'
    },
    home: {
      active_nodes: 'Активные узлы',
      tagline_top: 'Будущее —',
      tagline_highlight: 'Децентрализовано',
      description: 'Присоединяйтесь к глобальной нейронной сети. Валидируйте транзакции, защищайте блокчейн и зарабатывайте токены {token} пассивно.',
      initialize: 'Инициализация узла',
      initializing: 'Инициализация...',
      connection_established: 'Безопасное соединение установлено',
      audited: 'Проверено',
      global: 'Глобально'
    },
    lab: {
      daily_income: 'Ежедневный доход',
      monthly_projection: 'Месячный прогноз',
      available: 'Доступная инфраструктура',
      unit_price: 'Цена за единицу',
      daily_revenue: 'Ежедневный доход',
      tech_specs: 'Технические характеристики',
      architecture: 'Архитектура',
      power: 'Мощность',
      efficiency: 'Эффективность',
      roi_estimator: 'Калькулятор ROI',
      roi_description: 'Окупаемость примерно за {days}. Нулевые комиссии за обслуживание.',
      deploy: 'Развернуть за {price}',
      access_restricted: 'Доступ ограничен: только для лидеров',
      deployed: '+1 {name} успешно развёрнут'
    },
    assets: {
      wallet: 'Кошелёк',
      total_balance: 'Общий баланс',
      updated: 'ОБНОВЛЕНО ТОЛЬКО ЧТО',
      send: 'Отправить',
      receive: 'Получить',
      swap: 'Обмен',
      scan: 'Сканировать',
      assets: 'Активы',
      manage: 'Управление',
      import_token: '+ Импорт токена',
      coming_soon: 'Функция {action} скоро появится',
      token_locked: 'Список токенов заблокирован'
    },
    friends: {
      empire_growth: 'Рост империи',
      dual_incentive: 'Система двойного стимула',
      tap_to_learn: 'Нажмите, чтобы узнать о партнёрской программе.',
      copy_link: 'КОПИРОВАТЬ ССЫЛКУ',
      link_copied: 'Ссылка синдиката скопирована',
      total_earned: 'Всего заработано',
      passive_flow: 'Пассивный поток',
      top_operators: 'Топ операторы',
      verified: 'ПРОВЕРЕНО',
      affiliate_title: 'Логика партнёрства',
      affiliate_desc: 'Синдикат вознаграждает за расширение сети. Доходы обрабатываются автоматически через смарт-контракты.',
      direct_bonus: 'Прямой бонус (15%)',
      direct_bonus_desc: 'Получайте 15% от стоимости каждого узла, приобретённого вашими приглашёнными. Мгновенная выплата.',
      lifetime_passive: 'Пожизненный пассив (5%)',
      lifetime_passive_desc: 'Зарабатывайте 5% от всех COCO, добытых вашими партнёрами. Поток продолжается, пока их узлы активны.',
      rewards_note: 'Вознаграждения зачисляются в ваш кошелёк в реальном времени.',
      close: 'Закрыть'
    },
    game: {
      net_idle: 'СЕТЬ_ОЖИДАНИЕ',
      net_overload: 'СЕТЬ_ПЕРЕГРУЗКА',
      failure: 'ПРОВАЛ',
      uploading: 'ЗАГРУЗКА',
      ready: 'ГОТОВ',
      profit: 'ПРИБЫЛЬ',
      previous: 'Предыдущие пакеты',
      stake: 'Ставка (COCO)',
      retry: 'ПОВТОР',
      eject: 'ВЫХОД',
      upload: 'СТАРТ',
      win_message: 'Загрузка завершена! +{amount} COCO'
    },
    settings: {
      title: 'Настройки',
      general: 'Общие',
      language: 'Язык',
      select_language: 'Выберите язык',
      system: 'Система',
      privacy: 'Конфиденциальность и безопасность',
      support: 'Поддержка Coco',
      whitepaper: 'Whitepaper v1.0',
      restricted: '{action} ограничен в вашем регионе'
    },
    header: {
      welcome: 'С возвращением',
      online: 'ОНЛАЙН'
    },
    mining: {
      unlock_title: 'Разблокировать авто-майнер',
      speed_limited: 'Ограничено',
      hardware_limit: 'Достигнут лимит оборудования',
      manual_inefficient: 'Ручная синхронизация неэффективна',
      manual_desc: 'Задержка биологического ввода ограничивает генерацию прибыли. Разверните {node} для автоматизации валидации и увеличения дохода на 500%.',
      current_speed: 'Текущая скорость',
      node_speed: 'Скорость узла',
      get_node: 'Получить инфраструктуру узла'
    }
  },
  tr: {
    menu: {
      dashboard: 'Panel',
      lab: 'Lab',
      assets: 'Varlıklar',
      network: 'Ağ',
      game: 'Oyun'
    },
    dashboard: {
      sync: 'SENKRONİZE EDİLİYOR...',
      hold: 'BASILI TUT',
      rate: 'Oran',
      neural_pathway: 'Nöral yolları senkronize etmek ve işlemleri doğrulamak için basılı tutun.'
    },
    syndicate: {
      title: 'Sendika',
      agents: 'Ajanlar',
      direct: 'Doğrudan',
      lifetime: 'Ömür Boyu'
    },
    home: {
      active_nodes: 'Aktif Düğümler',
      tagline_top: 'Gelecek',
      tagline_highlight: 'Merkeziyetsiz',
      description: 'Küresel nöral ağa katılın. İşlemleri doğrulayın, blok zincirini güvence altına alın ve pasif olarak {token} token kazanın.',
      initialize: 'Düğümü Başlat',
      initializing: 'Başlatılıyor...',
      connection_established: 'Güvenli bağlantı kuruldu',
      audited: 'Denetlenmiş',
      global: 'Küresel'
    },
    lab: {
      daily_income: 'Günlük Gelir Toplamı',
      monthly_projection: 'Aylık Projeksiyon',
      available: 'Mevcut Altyapı',
      unit_price: 'Birim Fiyatı',
      daily_revenue: 'Günlük Gelir',
      tech_specs: 'Teknik Özellikler',
      architecture: 'Mimari',
      power: 'Güç',
      efficiency: 'Verimlilik',
      roi_estimator: 'ROI Hesaplayıcı',
      roi_description: 'Yaklaşık {days} içinde geri ödeme. Sıfır bakım ücreti.',
      deploy: '{price} karşılığı dağıt',
      access_restricted: 'Erişim Kısıtlı: Sadece Liderler',
      deployed: '+1 {name} başarıyla dağıtıldı'
    },
    assets: {
      wallet: 'Cüzdan',
      total_balance: 'Toplam Bakiye',
      updated: 'AZ ÖNCE GÜNCELLENDİ',
      send: 'Gönder',
      receive: 'Al',
      swap: 'Takas',
      scan: 'Tara',
      assets: 'Varlıklar',
      manage: 'Yönet',
      import_token: '+ Token İçe Aktar',
      coming_soon: '{action} özelliği yakında gelecek',
      token_locked: 'Token listesi kilitli'
    },
    friends: {
      empire_growth: 'İmparatorluk Büyümesi',
      dual_incentive: 'Çift Teşvik Sistemi',
      tap_to_learn: 'Ortaklık programı hakkında bilgi almak için dokunun.',
      copy_link: 'DAVET LİNKİNİ KOPYALA',
      link_copied: 'Sendika linki kopyalandı',
      total_earned: 'Toplam Kazanç',
      passive_flow: 'Pasif Akış',
      top_operators: 'En İyi Operatörler',
      verified: 'DOĞRULANMIŞ',
      affiliate_title: 'Ortaklık Mantığı',
      affiliate_desc: 'Sendika, ağı genişletmeniz için sizi ödüllendirir. Kazançlar akıllı sözleşmeler aracılığıyla otomatik olarak işlenir.',
      direct_bonus: 'Doğrudan Bonus (%15)',
      direct_bonus_desc: 'Doğrudan davetlilerinizin satın aldığı her Düğümün değerinin %15\'ini alın. Anında ödeme.',
      lifetime_passive: 'Ömür Boyu Pasif (%5)',
      lifetime_passive_desc: 'Ortaklarınızın kazandığı tüm COCO\'nun %5\'ini kazanın. Düğümleri aktif olduğu sürece akış devam eder.',
      rewards_note: 'Ödüller gerçek zamanlı olarak Varlıklar cüzdanınıza aktarılır.',
      close: 'Kapat'
    },
    game: {
      net_idle: 'AĞ_BOŞTA',
      net_overload: 'AĞ_AŞIRI_YÜK',
      failure: 'BAŞARISIZ',
      uploading: 'YÜKLENİYOR',
      ready: 'HAZIR',
      profit: 'KÂR',
      previous: 'Önceki Paketler',
      stake: 'Bahis (COCO)',
      retry: 'TEKRAR',
      eject: 'ÇIKIŞ',
      upload: 'YÜKLE',
      win_message: 'Yükleme tamamlandı! +{amount} COCO'
    },
    settings: {
      title: 'Ayarlar',
      general: 'Genel',
      language: 'Dil',
      select_language: 'Dil Seçin',
      system: 'Sistem',
      privacy: 'Gizlilik ve Güvenlik',
      support: 'Coco Destek',
      whitepaper: 'Whitepaper v1.0',
      restricted: '{action} bölgenizde kısıtlıdır'
    },
    header: {
      welcome: 'Tekrar hoş geldiniz',
      online: 'ÇEVRİMİÇİ'
    },
    mining: {
      unlock_title: 'Otomatik Madenciyi Aç',
      speed_limited: 'Sınırlı',
      hardware_limit: 'Donanım Limitine Ulaşıldı',
      manual_inefficient: 'Manuel Senkronizasyon Verimsiz',
      manual_desc: 'Biyolojik giriş gecikmeniz kâr üretimini sınırlıyor. Doğrulamayı otomatikleştirmek ve getiriyi %500 artırmak için bir {node} dağıtın.',
      current_speed: 'Mevcut Hız',
      node_speed: 'Düğüm Hızı',
      get_node: 'Düğüm Altyapısı Al'
    }
  }
}

const savedLocale = localStorage.getItem('user_locale')
const defaultLocale = savedLocale && Object.keys(messages).includes(savedLocale) ? savedLocale : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages,
})
