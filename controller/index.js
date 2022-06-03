// database.js에서 exports 한 pool 모듈을 가져옴. ("" 써야함-> 왜? '' 랑 차이점은 뭔데?)
const { pool } = require("../config/database");
const {response, errResponse} = require("../config/response");
const baseResponse = require("../config/baseResponseDict");
const logger = require('loglevel');

exports.indexTest = async function (req, res, next) {

    try{
        let result = {
            message : 'hello',
            id : "123"
        };

        // sql=쿼리문
        const sql = 'select * from test;'
        // pool에서 getConnection 의 뜻과 사용 용도를 아직 모름 -> 알아봐야할 듯
        const connection = await pool.getConnection(async (conn)=>conn);
        const [array] = await connection.query(sql);

        return res.send(response(baseResponse.SUCCESS("성공 메세지를 입력하세요"),array));


        //Error 발생시 catch 문 실행
    }catch (err) {
        logger.warn(err + "응답 실패")
        return res.send(errResponse(baseResponse.FAIL))
    }

}