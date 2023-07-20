-- CreateEnum
CREATE TYPE "enumCoinEngraversSide" AS ENUM ('obverse', 'reverse');

-- CreateEnum
CREATE TYPE "enumCollectionsCollectableType" AS ENUM ('coin', 'note');

-- CreateTable
CREATE TABLE "banknote" (
    "id" SERIAL NOT NULL,
    "face_value" DECIMAL(8,3) NOT NULL,
    "pretty_face_value" VARCHAR(30) NOT NULL,
    "common_name" VARCHAR(60),
    "obverse" TEXT NOT NULL,
    "reverse" TEXT NOT NULL,
    "year_start" VARCHAR(255),
    "year_end" VARCHAR(255),
    "composition" VARCHAR(255),
    "dimensions_milimeters" VARCHAR(40),
    "comments" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "period_id" INTEGER,
    "country_id" INTEGER,
    "currency_id" INTEGER,

    CONSTRAINT "Banknotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banknote_mint" (
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "banknote_id" INTEGER NOT NULL,
    "mint_id" INTEGER NOT NULL,

    CONSTRAINT "BanknoteMint_pkey" PRIMARY KEY ("banknote_id","mint_id")
);

-- CreateTable
CREATE TABLE "coin" (
    "id" SERIAL NOT NULL,
    "face_value" DECIMAL(8,3) NOT NULL,
    "pretty_face_value" VARCHAR(30),
    "series_or_theme_name" VARCHAR(200),
    "common_name" VARCHAR(200),
    "obverse" TEXT NOT NULL,
    "reverse" TEXT NOT NULL,
    "edge" VARCHAR(255) NOT NULL,
    "edge_inscription" VARCHAR(255),
    "year_start" VARCHAR(255),
    "year_end" VARCHAR(255),
    "composition" VARCHAR(255),
    "is_non_circulating" BOOLEAN DEFAULT false,
    "weight_grams" DECIMAL(7,3),
    "diameter_milimeters" DECIMAL(7,3),
    "comments" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "period_id" INTEGER,
    "ruler_id" INTEGER,
    "country_id" INTEGER,
    "currency_id" INTEGER,
    "shape_id" INTEGER,
    "numista_number" VARCHAR(8),
    "is_bullion" BOOLEAN DEFAULT false,

    CONSTRAINT "Coins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coin_engravers" (
    "id" SERIAL NOT NULL,
    "side" "enumCoinEngraversSide" DEFAULT 'obverse',
    "coin_id" INTEGER,
    "engraver_id" INTEGER,

    CONSTRAINT "CoinEngravers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coin_mint" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coin_id" INTEGER NOT NULL,
    "mint_id" INTEGER NOT NULL,

    CONSTRAINT "CoinMint_pkey" PRIMARY KEY ("coin_id","mint_id")
);

-- CreateTable
CREATE TABLE "coinset" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "Coinsets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection" (
    "id" SERIAL NOT NULL,
    "collectable_type" "enumCollectionsCollectableType" DEFAULT 'coin',
    "year" VARCHAR(10) NOT NULL,
    "serial_number" VARCHAR(16),
    "condition" TEXT,
    "paid_amount" DECIMAL(7,2),
    "sourced_from" VARCHAR(255),
    "sourced_when" TIMESTAMPTZ(6),
    "is_cleaned" BOOLEAN DEFAULT false,
    "storage" VARCHAR(255),
    "is_proof" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banknote_id" INTEGER,
    "coin_id" INTEGER,
    "coinset_id" INTEGER,
    "mint_id" INTEGER,
    "purchased_with_currency_id" INTEGER,
    "owner_id" TEXT,
    "comments" TEXT,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "short_name" VARCHAR(40) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "territory_of_country_id" INTEGER,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_currency" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country_id" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,

    CONSTRAINT "CountryCurrency_pkey" PRIMARY KEY ("country_id","currency_id")
);

-- CreateTable
CREATE TABLE "country_mint" (
    "country_id" INTEGER NOT NULL,
    "mint_id" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_country_mint" PRIMARY KEY ("country_id","mint_id")
);

-- CreateTable
CREATE TABLE "currency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "short_name" VARCHAR(10) NOT NULL,
    "years" VARCHAR(100),
    "demonitized_date" VARCHAR(100),
    "comments" TEXT,
    "display_short_name_at_left" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "engraver" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Engravers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "copyright" VARCHAR(100),
    "description" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banknote_id" INTEGER,
    "coin_id" INTEGER,
    "is_preferred" BOOLEAN DEFAULT false,
    "raw_html" TEXT,
    "collection_id" INTEGER,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mint" (
    "id" SERIAL NOT NULL,
    "mint" VARCHAR(255) NOT NULL,
    "years" VARCHAR(255),
    "mark" VARCHAR(10),
    "mark_description" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "years" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country_id" INTEGER,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT,
    "role_id" TEXT,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruler" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "house" TEXT,
    "years" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rulers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruler_country" (
    "id" SERIAL NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ruler_id" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "RulerCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shape" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Shapes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "unq_coin_numistaNumber" ON "coin"("numista_number");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Engravers_name_key" ON "engraver"("name");

-- CreateIndex
CREATE INDEX "RulerCountry_rulerId_countryId_idx" ON "ruler_country"("ruler_id", "country_id");

-- CreateIndex
CREATE UNIQUE INDEX "Shapes_name_key" ON "shape"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "banknote" ADD CONSTRAINT "Banknotes_countryId_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banknote" ADD CONSTRAINT "Banknotes_currencyId_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banknote" ADD CONSTRAINT "Banknotes_periodId_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banknote_mint" ADD CONSTRAINT "BanknoteMint_banknoteId_fkey" FOREIGN KEY ("banknote_id") REFERENCES "banknote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banknote_mint" ADD CONSTRAINT "BanknoteMint_mintId_fkey" FOREIGN KEY ("mint_id") REFERENCES "mint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin" ADD CONSTRAINT "Coins_countryId_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin" ADD CONSTRAINT "Coins_currencyId_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin" ADD CONSTRAINT "Coins_periodId_fkey" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin" ADD CONSTRAINT "Coins_rulerId_fkey" FOREIGN KEY ("ruler_id") REFERENCES "ruler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin" ADD CONSTRAINT "Coins_shapeId_fkey" FOREIGN KEY ("shape_id") REFERENCES "shape"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin_mint" ADD CONSTRAINT "CoinMint_coinId_fkey" FOREIGN KEY ("coin_id") REFERENCES "coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin_mint" ADD CONSTRAINT "CoinMint_mintId_fkey" FOREIGN KEY ("mint_id") REFERENCES "mint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "Collections_banknoteId_fkey" FOREIGN KEY ("banknote_id") REFERENCES "banknote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "Collections_coinId_fkey" FOREIGN KEY ("coin_id") REFERENCES "coin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "Collections_coinsetId_fkey" FOREIGN KEY ("coinset_id") REFERENCES "coinset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "Collections_mintId_fkey" FOREIGN KEY ("mint_id") REFERENCES "mint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "Collections_purchasedWithCurrencyId_fkey" FOREIGN KEY ("purchased_with_currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "FK_collection_user" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "Countries_territoryOfCountryId_fkey" FOREIGN KEY ("territory_of_country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_currency" ADD CONSTRAINT "CountryCurrency_countryId_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_currency" ADD CONSTRAINT "CountryCurrency_currencyId_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_mint" ADD CONSTRAINT "FK_country_mint_country" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country_mint" ADD CONSTRAINT "FK_country_mint_mint" FOREIGN KEY ("mint_id") REFERENCES "mint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "Images_banknoteId_fkey" FOREIGN KEY ("banknote_id") REFERENCES "banknote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "Images_coinId_fkey" FOREIGN KEY ("coin_id") REFERENCES "coin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "Periods_countryId_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "Roles_roleId_fkey" FOREIGN KEY ("role_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ruler_country" ADD CONSTRAINT "RulerCountry_countryId_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ruler_country" ADD CONSTRAINT "RulerCountry_rulerId_fkey" FOREIGN KEY ("ruler_id") REFERENCES "ruler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
