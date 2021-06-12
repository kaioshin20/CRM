const express=require("express");
const router=express.Router();

//const AuthHelper=require("../Helpers/AuthHelper")


//Storage domain
const StorageCtrl=require("../controllers/warehouse/Storage/storage")
const FootwearCtrl = require("../controllers/warehouse/Storage/getFootwear")
const MedicinesCtrl = require("../controllers/warehouse/Storage/getMedicines")
const FurnitureCtrl = require("../controllers/warehouse/Storage/getFurniture")
const ClothingsCtrl = require("../controllers/warehouse/Storage/getClothings")
const CosmeticsCtrl = require("../controllers/warehouse/Storage/getCosmetics")
const AlterStatusCtrl = require("../controllers/warehouse/Status/alterStatus")

//GRN
const GRNCtrl = require("../controllers/warehouse/GRN/GRN")

//PICKLIST
const PickListCtrl = require("../controllers/warehouse/PickList/PickList")

//booking products domain
const GetProductCtrl=require("../controllers/warehouse/BookingProducts/bookProduct")
const CancelBookingCtrl = require("../controllers/warehouse/BookingProducts/cancelBooking")
const EditBookingCtrl = require("../controllers/warehouse/BookingProducts/editBooking")
const GetBookedProductCtrl=require("../controllers/warehouse/BookingProducts/getBookedProducts")
const GetPackedProductCtrl=require("../controllers/warehouse/BookingProducts/getPackedProducts")
const GetReadyProductCtrl=require("../controllers/warehouse/BookingProducts/getReadyProducts")
const GetShippedProductCtrl=require("../controllers/warehouse/BookingProducts/getShippedProducts")



//Storage
router.post('/product/add-product',StorageCtrl.AddProduct)
router.post('/product/:id/getproductById',StorageCtrl.GetProductById)
router.get('/product/getAllFromStorage',StorageCtrl.GetAllFromStorage)
router.get('/product/getFootwear',FootwearCtrl.GetFootwear)
router.get('/product/getMedicines',MedicinesCtrl.GetMedicines)
router.get('/product/getFurniture',FurnitureCtrl.GetFurniture)
router.get('/product/getClothing',ClothingsCtrl.GetClothing)
router.get('/product/getCosmetics',CosmeticsCtrl.GetCosmetics)


//Booking
router.post('/product/:id/cancelBooking',CancelBookingCtrl.cancelBooking)
router.get('/product/:id/getbookingById',GetProductCtrl.getBookingById)
router.post('/product/:id/editBooking',EditBookingCtrl.editBooking)
router.get('/product/getBookedProducts',GetBookedProductCtrl.getBookedProducts)
router.post('/product/add-booking',GetProductCtrl.AddBooking)
router.get('/product/getAllBooking',GetProductCtrl.getAllBooking)
router.get('/product/getPackedProducts',GetPackedProductCtrl.getPackedProducts)
router.get('/product/getReadyProducts',GetReadyProductCtrl.getReadyProducts)
router.get('/product/getShippedProducts',GetShippedProductCtrl.getShippedProducts)


//Shipping status
router.post('/product/:id/alterStatus',AlterStatusCtrl.AlterStatus)

// GOOD receipt notes
router.post('/grn/creation',GRNCtrl.AddGRN)
router.get('/grn/getAllgrn',GRNCtrl.getAllGrn)
router.get('/grn/:id/getGrnById',GRNCtrl.getGRNById)
router.post('/grn/edit/:id/editGrnById',GRNCtrl.editGRNById)
router.post('/grn/:id/deleteGrnById',GRNCtrl.deleteGRNById)


//PICK LIST
router.post('/pickList/creation',PickListCtrl.AddPickList)
router.get('/pickList/getAllpickList',PickListCtrl.getAllPickList)
router.get('/pickList/:id/getPickListById',PickListCtrl.getPickListById)
router.post('/pickList/edit/:id/editPickListById',PickListCtrl.editPickListById)
router.post('/pickList/:id/deletePickListById',PickListCtrl.deletePickListById)


module.exports=router
