const connection = require("../database/connection");

module.exports = {
    async create(request,response)
    {
        const {title,description,value} = request.body;
        const ong_id = request.headers.authorization;

        const [id]= await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id});
    },
    async index(request,response)
    {
        const { page = 1 } = request.query;

        //Contador de registros
        const [count] = await connection('incidents')
                    .count();

        const incidents= await connection('incidents')
                        .join('ongs','ongs.id','=','incidents.ong_id')
                        .limit(5)
                        .offset((page-1)*5)
                        .select([
                                'incidents.*',
                                'ongs.name',
                                'ongs.email',
                                'ongs.whatsapp',
                                'ongs.city',
                                'ongs.uf'
                            ]);
        //Adicionad o totalizador de registros no header da resposta
        response.header('X-Total-Count',count['count(*)'])

        return response.json(incidents);
    },
    async listById(request,response)
    {
        const  params  = await request.params;
        
        const ongs = await connection('incidents')
                    .select('*')
                    .where('id',params.id);
        return response.json(ongs);
    },

    async delete(request,response){
        const ong_id = request.headers.authorization;
        const {id} = request.params;

        const incident = await connection('incidents')
                        	.where('id',id)
                        	.select('ong_id')
                        	.first();

        if(incident.ong_id !== ong_id){
	        return response
			.status(401)
			.json({error: "Operation not permitted"});
        }

        await connection('incidents')
			.where('id',id)
			.delete();
        return response.status(204).send();

    }
}