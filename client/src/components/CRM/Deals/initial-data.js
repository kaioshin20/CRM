export const initialData={
    tasks:[
        {
            _id: '5ef0725b8f07c634d0c9b554',
            name: 'Quloi1',
            stage: 'Stage1',
            amount: '10000',
            owner: 'Amit Nemade',
            companyId: '987645610862',
            contactId: '789456431486',
            timestamp: '2020-06-22T08:56:59.235Z',
            __v: 0
          },
          {
            _id: '5ef3139649d3493934d51048',
            name: 'Quloi2',
            stage: 'Stage2',
            amount: '10235',
            owner: 'Amit Nemade',
            companyId: '987645610862',
            contactId: '789456431486',
            timestamp: '2020-06-24T08:49:26.773Z',
            __v: 0
          },
          {
            _id: '5ef3141a11931e30c46afbdc',
            name: 'Quloi3',
            stage: 'Stage1',
            amount: '10235',
            closeDate: '2020-06-24T00:00:00.000Z',
            owner: 'Amit Nemade',
            companyId: '987645610862',
            contactId: '789456431486',
            timestamp: '2020-06-24T08:51:38.611Z',
            __v: 0
          }
    ],
    columns:{
        'column-1':{
            id: 'column-1',
            title: 'To do',
            taskIds: ['5ef0725b8f07c634d0c9b554', '5ef3139649d3493934d51048', '5ef3141a11931e30c46afbdc' ],
        },
        'column-2':{
            id: 'column-2',
            title: 'In Progress',
            taskIds: [],
        },
        'column-3':{
            id: 'column-3',
            title: 'Done',
            taskIds: [],    
        },
    },
    // Facilitate reordering of columns
    columnOrder: ['column-1', 'column-2', 'column-3'],

}