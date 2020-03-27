const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
    async create(request,response){
            //deserialização direta
            const { name,email,whatsapp,city,uf } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
          
            return response.json({id});
    },

    async index(request,response)
    {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async listById(request,response)
    {
        const  params  = await request.params;
        
        const ongs = await connection('ongs')
                    .select('*')
                    .where('id',params.id);
        return response.json(ongs);
    }
}