const PUBLISHER = require("../schemas/publisher.schema")

class PublisherController {
    async createPublisher(req, res, next) {
        try {
            const { MANXB, TENNXB, DIACHI } = req.body;
            console.log(MANXB)
            // Tạo nhà xuất bản mới
            const newPublisher = await PUBLISHER.create({
                MANXB: MANXB,
                TENNXB: TENNXB,
                DIACHI: DIACHI
            });

            console.log(newPublisher);

            res.json({message: "Nhà xuất bản mới đã được thêm"});
        } catch (error) {
            next(error);
        }
    }
    async getAllPublisher(req, res, next){
        try {
            const publisher = await PUBLISHER.find()
            res.json(publisher)
        } catch (error) {
            next(error)
        }
    }

    async updatePublisher(req, res, next){
        try {
            const {_id, MANXB, TENNXB, DIACHI} = req.body;
            console.log(_id)
            let category = await PUBLISHER.findById(_id);
            if(!category){
                return res.status(404).json({ message: 'Nhà xuất bản không tồn tại.' });
            }
            category = await PUBLISHER.findByIdAndUpdate(_id, {MANXB:MANXB, TENNXB:TENNXB,DIACHI:DIACHI})
            res.json({message: "Nhà xuất bản đã được cập nhật"});
        } catch (error) {
            next(error)
        }
    }

    async deletePublisher(req, res, next){
        try {
            const { id } = req.params;
            console.log(id)
            let category = await PUBLISHER.findById(id);
            if(!category){
                return res.status(404).json({ message: 'Nhà xuất bản không tồn tại.' });
            }
            category = await PUBLISHER.findByIdAndDelete(id)
            res.json({message: "Nhà xuất bản đã được xóa"});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PublisherController()