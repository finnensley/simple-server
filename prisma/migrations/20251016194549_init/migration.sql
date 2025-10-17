-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "picture" TEXT,
    "sku" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "total_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_locations" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "item_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "item_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "sku" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "taxes" DOUBLE PRECISION NOT NULL,
    "shipping_paid" DOUBLE PRECISION NOT NULL,
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_sku_key" ON "items"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "locations_location_key" ON "locations"("location");

-- CreateIndex
CREATE UNIQUE INDEX "item_locations_item_id_location_id_key" ON "item_locations"("item_id", "location_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- AddForeignKey
ALTER TABLE "item_locations" ADD CONSTRAINT "item_locations_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_locations" ADD CONSTRAINT "item_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
