const app = require("./app");
const config = require("./app/config");
const LIBRARIAN = require("./schemas/librarian.schema")
const bcrypt = require("./utils/bcrypt")

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/librarydb").then(async ()=>{
    const numberOfLibrarian = await LIBRARIAN.countDocuments();
    if (numberOfLibrarian)
        return;
    const newLibrarian = await LIBRARIAN.create({
        MSNV: "admin", 
        HOTENNV: "Lương Đức Huy", 
        MATKHAU: bcrypt.hashPassword("admin"), 
        CHUCVU: "Quản lý",
        DIACHI: "Cần Thơ",
        SODIENTHOAI: "0123456789"
    })
    console.log(newLibrarian);
});

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});