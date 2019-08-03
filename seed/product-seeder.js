let dbconfig=require('../dbconfig/db-connect')
dbconfig.connect(function (error) {
    if(error){
        console.log('DB connection error')
        process.exit(1)

    }else {
        console.log('connected successfully')
        dbconfig.get().collection('product').insertMany([
            {
                imagePath:'https://images.g2a.com/newlayout/323x433/1x1x0/0017f67ada95/59e60aeaae653a34fe0e9633',
                title:'gathic video game',
                description:'nice game',
                price:'20'
            },
            {
                imagePath:'https://venturebeat.com/wp-content/uploads/2018/08/fortnite.jpg?fit=400%2C225&strip=all',
                title:'fortnite',
                description:'nice game',
                price:'20'
            },
            {
                imagePath:'https://images.g2a.com/newlayout/323x433/1x1x0/0017f67ada95/59e60aeaae653a34fe0e9633',
                title:'PubG',
                description:'nice game',
                price:'20'
            },
            {
                imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt_YsrAKc8PEzMDJyH6YrS7IW3Z8ygtrVWJxERNKr_hq7yZfst',
                title:'PES',
                description:'nice game',
                price:'20'
            },
            {
                imagePath:'https://pl.scdn.co/images/pl/default/de677caeb7278c235f60eeb019e795a7ddc9152b',
                title:'mario',
                description:'nice game',
                price:'20'
            },
            {
                imagePath:'https://venturebeat.com/wp-content/uploads/2018/08/fortnite.jpg?fit=400%2C225&strip=all',
                title:'pubg',
                description:'nice game',
                price:'20'
            },
        ])

    }

})
