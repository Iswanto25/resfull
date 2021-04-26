const{foods} = require("../models/");
const foodsRoutes = require("../routes/foodsRoutes");
//controller digunakan untuk menambahkan method2 (aksi2)
module.exports ={
    getAllFoods : (req, res)=> {
        foods.findAll()
        .then((data)=>{
            res.send({
                msg: "success",
                status : 200,
                data
            });
        })
        .catch ((er) =>{
                res.send({
                    msg: "error",
                    status : 500,
                    err,
            });
        });
    },
    postFoods : (req, res)=>{
        let {body} = req;
        foods.create(body)
        .then((data)=>{
            res.status(200).send({
                msg : "sukses post data",
                status : 200,
                data,
            });
        })
        .catch((err)=>{
            res.status(500).send({
                msg : "failed post data",
                status : 500,
                err,
            });
        });
    },
    getDataById  : (req,res)=>{
        let {id} = req.params;
        foods.findOne({
            where : {id},
        })
        .then((data)=>{
        res.status(200).send({
         msg:"success get data by id",
         status : 200,
         data,
     });
    })
    .catch((err)=>{
        res.status(500).send({
            msg : "failed while get daya by id",
            status : 500,
            err,
        });
    });
    },
    putDataById : async (req, res)=>{
        let{id}=req.params;
        let{body}=req;
        const findFoods = await foods.findOne({
            where : {id}
        })
        if(findFoods === null){
            res.status(404).send({
                msg : "failed updaate data",
                status : 404,
                error : "data not found"
            })
        }
        foods.update(body,{
            where : {id}
        })
        .then((data)=>{
            console.log(findFoods);
            deletOBJ = {...findFoods.data, ...body};
            res.status(200).send({
                msg : "success update data by id ",
                status : 200,
                deletOBJ
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg : "failed update data by id",
                status : 500,
                err,
            });
        });
    },

    DeleteFoods : async(req, res)=>{
        let {id} = req.params;

        const findFoods = await foods.findOne({
            where : {id}
        })
        if(findFoods === null){
            res.status(404).send({
                msg : "failed delete data",
                status : 404,
                error : "data not found"
            })
        }
        foods.destroy({
            where : {id}
        })
        .then((data)=>{
            res.status(200).send({
                msg : "success delete data by id ",
                status : 200,
                findFoods,
            });
        })
        .catch((err)=>{
            res.status(500).send({
                msg : "failed update data by id",
                status : 500,
                err,
            });
        });
    }

};