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
    name: 'Factures',
    url: '/facture',
    icon: 'icon-calculator',
    admin: 'ADMIN',
    user: 'USER',
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
      }
    ]
  }
];
