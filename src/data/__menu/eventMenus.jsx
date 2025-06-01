import React from 'react';
    import { PartyPopper, Gift } from 'lucide-react';
    
    export const eventMenusData = [
      {
        id: 'weddingMenu',
        titleKey: 'eventMenuWeddingTitle',
        defaultTitle: 'Wedding Celebration Menu',
        pricePerPerson: 90,
        imageText: 'Elegant wedding dinner setup',
        icon: <PartyPopper size={24} />,
        groups: [
          {
            groupId: 'appetizer', // Corresponds to 'type' in categoriesData for filtering
            groupTitleKey: 'eventMenuGroupAppetizer',
            defaultGroupTitle: 'Choose Your Appetizer',
            itemIds: ['supa1', 'supa4'] // Items must exist in initialMenuDataFiltered
          },
          {
            groupId: 'mainCourse',
            groupTitleKey: 'eventMenuGroupMainCourse',
            defaultGroupTitle: 'Select Your Main Course',
            itemIds: ['fp2', 'fp5', 'fp6']
          },
          {
            groupId: 'dessert',
            groupTitleKey: 'eventMenuGroupDessert',
            defaultGroupTitle: 'Pick Your Dessert',
            itemIds: ['des1', 'des3']
          }
        ]
      },
      {
        id: 'birthdayMenu',
        titleKey: 'eventMenuBirthdayTitle',
        defaultTitle: 'Birthday Bash Menu',
        pricePerPerson: 75,
        imageText: 'Festive birthday table with cake',
        icon: <Gift size={24} />,
        groups: [
          {
            groupId: 'starter', // More generic, could map to 'appetizer' or 'pies'
            groupTitleKey: 'eventMenuGroupStarter',
            defaultGroupTitle: 'Choose Your Starter',
            itemIds: ['supa2', 'pp1']
          },
          {
            groupId: 'mainDish',
            groupTitleKey: 'eventMenuGroupMainDish',
            defaultGroupTitle: 'Select Your Main Dish',
            itemIds: ['fp1', 'fp3', 'pp2']
          },
          {
            groupId: 'sweetTreat',
            groupTitleKey: 'eventMenuGroupSweetTreat',
            defaultGroupTitle: 'Pick Your Sweet Treat',
            itemIds: ['des2', 'des4']
          }
        ]
      }
    ];