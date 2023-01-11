export default {
    name:'product',
    title:'Product',
    type:'document',
    fields:[
        {
            name:'image',
            title:'Image',
            type:'array',
            of:[{type:'image'}],
            option:{hotspot:true}
        },
        {
            name:'name',
            title:'Name',
            type:'string',
        },
        {
            name:'slug',
            title:'Slug',
            type:"slug",
            options:{
                source:'name',
                maxLength:90,
            }
        },
        {
            name:'price',
            title:'Price',
            type:'number',
        },
        {
            name:'option',
            title:'Option',
            type:'array',
            of:[{type:'string'}],
        },
        {
            name:'available',
            title:'Available',
            type:'boolean',
            
        },
        {
            name:'review',
            title:'Review',
            type:'number',
            
        },
        {
            name:'solde',
            title:'Solde',
            type:'number',
            
        },
        {
            name:'rating',
            title:'Rating',
            type:'number',
            description:'number of star between 1 - 5 ',
            initialValue: 5,
            validation:Rule => Rule.required().min(1).max(5)
           
            
        },
        {
            name:'tag',
            title:'Tag',
            type:'string',
            

        },
        {
            name:'details',
            title:'Details',
            type:'string'
        },
    ]
}