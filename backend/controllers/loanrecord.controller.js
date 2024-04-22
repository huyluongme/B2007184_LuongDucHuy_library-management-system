const theodoimuonsach = require("../schemas/loanrecord.schema")
const BOOK = require = require("../schemas/book.schema")
class LoanRecordController{
    async loanBook(req, res, next){
        const {
            DOCGIA,
            SACH,
            NGAYMUON,
            NGAYTRA,
            TRANGTHAI
        } = req.body;
        
        const newLoanRecord = await theodoimuonsach.create({DOCGIA: DOCGIA, SACH:SACH,NGAYMUON:NGAYMUON, NGAYTRA:NGAYTRA});
        console.log(newLoanRecord);
        
        let book = await BOOK.findById(SACH);
        book.SOQUYEN = book.SOQUYEN - 1
        await BOOK.findByIdAndUpdate(SACH, book)

        res.json({ message: "Phiếu mượn sách đã được tạo" });
    }

    async getLoanRecordById(req, res, next){
        try {
            const{id} = req.params;
            console.log("id ne " + id)
            const loadRecord = await theodoimuonsach.find({DOCGIA:id}).populate('DOCGIA').populate('SACH')
            res.json(loadRecord)
        } catch (error) {
            
        }
    }

    async getAllLoanRecord(req, res, next){
        try {
            const loadRecords = await theodoimuonsach.find().populate('DOCGIA').populate('SACH')
            res.json(loadRecords)
        } catch (error) {
            
        }
    }

    async updateStatusLoanRecord(req, res, next){
        const {
            _id,
            TRANGTHAI
        } = req.body;

        let LoanRecord = await theodoimuonsach.findById(_id);
        if (!LoanRecord) {
            return res.status(404).json({ message: 'Phiếu mượn không tồn tại.' });
        }
        LoanRecord.TRANGTHAI = TRANGTHAI;
        LoanRecord = await theodoimuonsach.findByIdAndUpdate(_id, LoanRecord);

        res.json({ message: 'Thông tin phiếu đã được cập nhật thành công.' });

    }
}

module.exports = new LoanRecordController()