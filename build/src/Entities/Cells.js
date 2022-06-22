"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cells = void 0;
const typeorm_1 = require("typeorm");
let Cells = class Cells extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cells.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 150,
    }),
    __metadata("design:type", String)
], Cells.prototype, "cellName", void 0);
__decorate([
    typeorm_1.Column({
        unique: true
    }),
    __metadata("design:type", String)
], Cells.prototype, "cellEmail", void 0);
__decorate([
    typeorm_1.Column({
        unique: true
    }),
    __metadata("design:type", String)
], Cells.prototype, "cellCode", void 0);
__decorate([
    typeorm_1.Column({
        type: "bigint"
    }),
    __metadata("design:type", Number)
], Cells.prototype, "contactNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cells.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Cells.prototype, "ManagerId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cells.prototype, "addressLine", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cells.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Cells.prototype, "pincode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cells.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({
        type: 'simple-array'
    }),
    __metadata("design:type", Array)
], Cells.prototype, "employees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Cells.prototype, "createdAt", void 0);
Cells = __decorate([
    typeorm_1.Entity('cells')
], Cells);
exports.Cells = Cells;
//# sourceMappingURL=Cells.js.map