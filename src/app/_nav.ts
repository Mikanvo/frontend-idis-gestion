export const navigation = [
  {
    title: true,
    name: 'MENU',
    admin: 'ADMIN',
    user: 'USER',
    client: 'CLIENT'
  },
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    icon: 'icon-speedometer',
    admin: 'ADMIN',
    user: 'USER',
    client: 'CLIENT'
  },
  {
    name: 'Clients',
    url: '/client',
    icon: 'icon-people',
    admin: 'ADMIN',
    user: 'USER'
  },
  {
    name: 'Employes',
    url: '/employe',
    icon: 'icon-people',
    admin: 'ADMIN',
    user: 'USER'
  },
  {
    name: 'Colis',
    url: '/colis-client',
    icon: 'icon-bag',
    admin: 'CLIENT'
  },
  {
    name: 'Colis',
    url: '/colis',
    icon: 'icon-bag',
    admin: 'ADMIN',
    user: 'USER',
    children: [
      {
        name: 'Envoyés',
        url: '/colis/send',
        icon: 'icon-action-redo'
      },
      {
        name: 'Réçus',
        url: '/colis/receive',
        icon: 'icon-action-undo'
      }
    ]
  },
  {
    name: 'Finances',
    url: '/finances',
    icon: 'icon-diamond',
    admin: 'ADMIN',
    user: 'USER',
    children: [
      {
        name: 'Factures',
        url: '/finances/facture',
        icon: 'icon-calculator',
        admin: 'ADMIN',
        user: 'USER',
      },
      {
        name: 'Règlements',
        url: '/finances/reglement',
        icon: 'icon-calculator',
        admin: 'ADMIN',
        user: 'USER',
      }
    ]
  },
  {
    name: 'Paramètres',
    url: '/parametres',
    icon: 'icon-settings',
    admin: 'ADMIN',
    children: [
      {
        name: 'Rôles',
        url: '/parametres/role',
        icon: 'icon-user-following'
      },
      {
        name: 'Utilisateurs',
        url: '/parametres/utilisateur',
        icon: 'icon-people'
      },
      {
        name: 'Fonctions',
        url: '/parametres/fonction',
        icon: 'icon-wrench'
      },
      {
        name: 'Sites',
        url: '/parametres/site',
        icon: 'icon-grid'
      },
      {
        name: 'Pays',
        url: '/parametres/pays',
        icon: 'icon-globe'
      },
      {
        name: 'Types Factures',
        url: '/parametres/type-facture',
        icon: 'icon-diamond'
      },
      {
        name: 'Types Règlements',
        url: '/parametres/type-reglement',
        icon: 'icon-diamond'
      },
      {
        name: 'Devises',
        url: '/parametres/devise',
        icon: 'icon-diamond'
      },
      {
        name: 'Tva',
        url: '/parametres/tva',
        icon: 'icon-diamond'
      }
    ]
  }
];
