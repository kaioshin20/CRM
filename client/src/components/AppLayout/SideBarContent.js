import React from 'react';
// import CustomScrollbars from 'util/CustomScrollbars';
import CustomScrollbars from './CustomScrollbars';

const SideBarContent = [
    {
      name: 'sidebar.main',
      type: 'list',
      children: [
        {
          name: 'sidebar.dashboard',
          icon: 'view-dashboard',
          type: 'item',
        },
        {
          name: 'sidebar.dashboard.contacts',
          type: 'item',
          link: '/app/dashboard/contacts'
        },
        {
          name: 'sidebar.dashboard.company',
          type: 'item',
          link: '/app/dashboard/company'
        },
        {
          name: 'sidebar.dashboard.deals',
          type: 'item',
          link: '/app/dashboard/deals'
        },
        {
          name: 'sidebar.dashboard.tickets',
          type: 'item',
          link: '/app/dashboard/tickets'
        },
    ]},
    {
      name: 'sidebar.main',
      type: 'collapse',
      children: [
        {
          name: 'sidebar.dashboard',
          icon: 'view-dashboard',
          type: 'collapse',
        },
        {
          name: 'sidebar.dashboard.contacts',
          type: 'item',
          link: '/app/dashboard/contacts'
        },
        {
          name: 'sidebar.dashboard.company',
          type: 'item',
          link: '/app/dashboard/company'
        },
        {
          name: 'sidebar.dashboard.deals',
          type: 'item',
          link: '/app/dashboard/deals'
        },
        {
          name: 'sidebar.dashboard.tickets',
          type: 'item',
          link: '/app/dashboard/tickets'
        },
    ]},
  ];

export default SideBarContent;
