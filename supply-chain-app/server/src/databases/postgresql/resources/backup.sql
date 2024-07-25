--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13
-- Dumped by pg_dump version 12.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.weight_master DROP CONSTRAINT IF EXISTS "FK_a8508a141460e0d3be0ef69faa3";
ALTER TABLE IF EXISTS ONLY public.item_information DROP CONSTRAINT IF EXISTS "FK_0cb6428ae300677026f530b5032";
ALTER TABLE IF EXISTS ONLY public.user_master DROP CONSTRAINT IF EXISTS "PK_dc2fd281084013caf643e90092c";
ALTER TABLE IF EXISTS ONLY public.item_category_group_information DROP CONSTRAINT IF EXISTS "PK_dae868f77a55371fa5a92577484";
ALTER TABLE IF EXISTS ONLY public.weight_master DROP CONSTRAINT IF EXISTS "PK_b887187732cb83a61ebb339b1cc";
ALTER TABLE IF EXISTS ONLY public.business_type_infomation DROP CONSTRAINT IF EXISTS "PK_b0072878de92cb04b7390569d64";
ALTER TABLE IF EXISTS ONLY public.transaction_information DROP CONSTRAINT IF EXISTS "PK_a9cd6f0d70dd84378eb0ac38a9c";
ALTER TABLE IF EXISTS ONLY public.item_information DROP CONSTRAINT IF EXISTS "PK_9f30065d95276a2cf14cc016db2";
ALTER TABLE IF EXISTS ONLY public.company_information DROP CONSTRAINT IF EXISTS "PK_7f38f703898cb13d97934bb3299";
ALTER TABLE IF EXISTS ONLY public.evaluation_detail_item DROP CONSTRAINT IF EXISTS "PK_78ee561b8673d6e9701e52a8af6";
ALTER TABLE IF EXISTS ONLY public.evaluation_result_item_category DROP CONSTRAINT IF EXISTS "PK_50ad37629ce1388131a24dbcad7";
ALTER TABLE IF EXISTS ONLY public.evaluation_result_item DROP CONSTRAINT IF EXISTS "PK_4cd66752e0729485a66f059e9b9";
ALTER TABLE IF EXISTS ONLY public.evaluation_result_item_category_group DROP CONSTRAINT IF EXISTS "PK_1b6a4b5d30f274322e3fe6a9b5a";
ALTER TABLE IF EXISTS ONLY public.evaluation_detail_item_category DROP CONSTRAINT IF EXISTS "PK_18d9cb06cfa1debc925943b8d83";
ALTER TABLE IF EXISTS ONLY public.item_category_information DROP CONSTRAINT IF EXISTS "PK_1033abaf8cef7e7ba758804ed91";
ALTER TABLE IF EXISTS ONLY public.evaluation_detail_item_category_group DROP CONSTRAINT IF EXISTS "PK_02e9fba80b1df46b5cc31be6d39";
DROP TABLE IF EXISTS public.weight_master;
DROP TABLE IF EXISTS public.user_master;
DROP TABLE IF EXISTS public.transaction_information;
DROP VIEW IF EXISTS public.test2;
DROP VIEW IF EXISTS public.test;
DROP TABLE IF EXISTS public.item_information;
DROP TABLE IF EXISTS public.item_category_information;
DROP TABLE IF EXISTS public.item_category_group_information;
DROP TABLE IF EXISTS public.evaluation_result_item_category_group;
DROP TABLE IF EXISTS public.evaluation_result_item_category;
DROP TABLE IF EXISTS public.evaluation_result_item;
DROP TABLE IF EXISTS public.evaluation_detail_item_category_group;
DROP TABLE IF EXISTS public.evaluation_detail_item_category;
DROP TABLE IF EXISTS public.evaluation_detail_item;
DROP TABLE IF EXISTS public.company_information;
DROP TABLE IF EXISTS public.business_type_infomation;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: business_type_infomation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_type_infomation (
    business_type_id character varying NOT NULL,
    business_type_name character varying NOT NULL
);


ALTER TABLE public.business_type_infomation OWNER TO postgres;

--
-- Name: company_information; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_information (
    company_id character varying NOT NULL,
    company_name character varying NOT NULL,
    headquarters_location character varying,
    location_area character varying,
    capital integer,
    regular_customer character varying,
    establishment_year integer,
    number_of_employees integer,
    representative character varying,
    operating_profit integer NOT NULL,
    capital_ratio double precision,
    company_introduction character varying,
    hp_link character varying,
    image_path character varying,
    staff_message character varying,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    business_type_id character varying NOT NULL,
    sales integer
);


ALTER TABLE public.company_information OWNER TO postgres;

--
-- Name: evaluation_detail_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluation_detail_item (
    company_id character varying NOT NULL,
    item_category_id character varying NOT NULL,
    item_id character varying NOT NULL,
    relevant_score character varying NOT NULL,
    score double precision,
    parameter character varying NOT NULL,
    value double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    item_category_group_id character varying NOT NULL,
    min_value double precision,
    bottom_25per_value double precision,
    median_value double precision,
    top_25per_value double precision,
    max_value double precision
);


ALTER TABLE public.evaluation_detail_item OWNER TO postgres;

--
-- Name: evaluation_detail_item_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluation_detail_item_category (
    company_id character varying NOT NULL,
    item_category_id text NOT NULL,
    relevant_score character varying NOT NULL,
    score double precision,
    parameter character varying NOT NULL,
    value double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    item_category_group_id character varying NOT NULL,
    min_value double precision,
    bottom_25per_value double precision,
    median_value double precision,
    top_25per_value double precision,
    max_value double precision
);


ALTER TABLE public.evaluation_detail_item_category OWNER TO postgres;

--
-- Name: evaluation_detail_item_category_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluation_detail_item_category_group (
    company_id character varying NOT NULL,
    relevant_score character varying NOT NULL,
    score double precision,
    parameter character varying NOT NULL,
    value double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    item_category_group_id character varying NOT NULL,
    min_value double precision,
    bottom_25per_value double precision,
    median_value double precision,
    top_25per_value double precision,
    max_value double precision
);


ALTER TABLE public.evaluation_detail_item_category_group OWNER TO postgres;

--
-- Name: evaluation_result_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluation_result_item (
    company_id character varying NOT NULL,
    item_category_id character varying NOT NULL,
    item_id character varying NOT NULL,
    quality_score double precision,
    cost_score double precision,
    delivery_score double precision,
    finance_score double precision,
    environment_score double precision,
    labor_score double precision,
    ethics_score double precision,
    sustainable_score double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    item_category_group_id character varying NOT NULL
);


ALTER TABLE public.evaluation_result_item OWNER TO postgres;

--
-- Name: evaluation_result_item_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluation_result_item_category (
    company_id character varying NOT NULL,
    item_category_id character varying NOT NULL,
    quality_score double precision,
    cost_score double precision,
    delivery_score double precision,
    finance_score double precision,
    environment_score double precision,
    labor_score double precision,
    ethics_score double precision,
    sustainable_score double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    item_category_group_id character varying NOT NULL
);


ALTER TABLE public.evaluation_result_item_category OWNER TO postgres;

--
-- Name: evaluation_result_item_category_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluation_result_item_category_group (
    company_id character varying NOT NULL,
    quality_score double precision,
    cost_score double precision,
    delivery_score double precision,
    finance_score double precision,
    environment_score double precision,
    labor_score double precision,
    ethics_score double precision,
    sustainable_score double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    item_category_group_id character varying NOT NULL
);


ALTER TABLE public.evaluation_result_item_category_group OWNER TO postgres;

--
-- Name: item_category_group_information; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_category_group_information (
    item_category_group_id character varying NOT NULL,
    item_category_group_name character varying NOT NULL
);


ALTER TABLE public.item_category_group_information OWNER TO postgres;

--
-- Name: item_category_information; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_category_information (
    item_category_id character varying NOT NULL,
    item_category_name character varying NOT NULL,
    item_category_group_id character varying NOT NULL
);


ALTER TABLE public.item_category_information OWNER TO postgres;

--
-- Name: item_information; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_information (
    item_category_id character varying NOT NULL,
    item_id character varying NOT NULL,
    item_name character varying NOT NULL,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    company_id character varying NOT NULL,
    original_item_name character varying NOT NULL
);


ALTER TABLE public.item_information OWNER TO postgres;

--
-- Name: test; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.test AS
 SELECT icgi.item_category_group_id AS "itemCategoryGroupId",
    icgi.item_category_group_name AS "itemCategoryGroupName",
    ici.item_category_id AS "itemCategoryId",
    ici.item_category_name AS "itemCategoryName",
    max_ii.itemid AS "itemId"
   FROM ((public.item_category_group_information icgi
     JOIN public.item_category_information ici ON (((ici.item_category_group_id)::text = (icgi.item_category_group_id)::text)))
     JOIN ( SELECT ii.item_category_id AS itemcategoryid,
            ii.item_id AS itemid,
            max(ii.update_date) AS updatedate
           FROM public.item_information ii
          GROUP BY ii.item_category_id, ii.item_id) max_ii ON (((max_ii.itemcategoryid)::text = (ici.item_category_id)::text)))
  ORDER BY icgi.item_category_group_name, ici.item_category_name;


ALTER TABLE public.test OWNER TO postgres;

--
-- Name: test2; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.test2 AS
 SELECT icgi.item_category_group_id AS "itemCategoryGroupId",
    icgi.item_category_group_name AS "itemCategoryGroupName",
    ici.item_category_id AS "itemCategoryId",
    ici.item_category_name AS "itemCategoryName",
    max_ii.itemid AS "itemId",
    max_ii.updatedate
   FROM ((public.item_category_group_information icgi
     JOIN public.item_category_information ici ON (((ici.item_category_group_id)::text = (icgi.item_category_group_id)::text)))
     JOIN ( SELECT ii.item_category_id AS itemcategoryid,
            ii.item_id AS itemid,
            max(ii.update_date) AS updatedate
           FROM public.item_information ii
          GROUP BY ii.item_category_id, ii.item_id) max_ii ON (((max_ii.itemcategoryid)::text = (ici.item_category_id)::text)))
  ORDER BY icgi.item_category_group_name, ici.item_category_name;


ALTER TABLE public.test2 OWNER TO postgres;

--
-- Name: transaction_information; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_information (
    buyer_company_id character varying NOT NULL,
    vendor_company_id character varying NOT NULL,
    item_id character varying NOT NULL,
    proposed_price double precision,
    actual_price double precision,
    order_quantity double precision,
    update_date timestamp without time zone NOT NULL,
    update_year integer NOT NULL,
    original_item_name text
);


ALTER TABLE public.transaction_information OWNER TO postgres;

--
-- Name: user_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_master (
    user_id character varying NOT NULL,
    login_id character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.user_master OWNER TO postgres;

--
-- Name: weight_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.weight_master (
    user_id character varying NOT NULL,
    quality_weight double precision NOT NULL,
    cost_weight double precision NOT NULL,
    delivery_weight double precision NOT NULL,
    finance_weight double precision NOT NULL,
    environment_weight double precision NOT NULL,
    labor_weight double precision NOT NULL,
    ethics_weight double precision NOT NULL,
    sustainable_weight double precision NOT NULL,
    update_date timestamp without time zone NOT NULL
);


ALTER TABLE public.weight_master OWNER TO postgres;

--
-- Data for Name: business_type_infomation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.business_type_infomation (business_type_id, business_type_name) FROM stdin;
33399	他に分類されない鉄鋼業
36619	その他の通信機械器具・同関連機械器具製造業
33131	熱間圧延業（鋼管，伸鉄を除く）
38221	一般長さ計製造業
39611	プラスチックフィルム製造業
40852	医療用機械器具卸売業（歯科用機械器具を含む）
37131	自動車用内燃機関製造業
34209	その他の金物類製造業
38411	医療用機械器具製造業（歯科用，動物用を除く）
36612	無線通信機械器具製造業
37601	航空機製造業
39661	プラスチック板・棒・管・継手・異形押出製品加工業
35821	冷凍機・温湿調整装置製造業
39504	針・ピン・ホック・スナップ・同関連品製造業
33509	その他の非鉄金属第２次製錬・精製業（非鉄金属合金製造業を含む
33611	伸銅品製造業
36701	電気計測器製造業
35961	包装・荷造機械製造業
36199	他に分類されないその他の産業用電気機械器具製造業（車両用，船
33202	可鍛鋳鉄製造業
37909	他に分類されない輸送用機械器具製造業
33711	銅・同合金鋳物製造業（ダイカストを除く）
40842	機械工具卸売業
34309	その他の暖房・調理装置製造業（電気機械器具，ガス機器，石油機
37311	鋼船製造・修理業
35412	金属加工機械製造業（金属工作機械を除く）
39909	他に分類されないその他の製造業
37501	自転車・同部分品製造業
41911	生ゴム・ゴム製品卸売業
39632	強化プラスチック製容器・浴槽等製造業
38604	光学機械用レンズ・プリズム製造業
36133	開閉装置・配電盤・電力制御装置製造業
38211	圧力計・流量計・液面計等製造業
36501	電球製造業
33802	光ファイバーケーブル製造業（通信複合ケーブルを含む）
34101	ブリキ缶・その他のメッキ板等製品製造業
33699	他に分類されないその他の非鉄金属・同合金圧延業（抽伸，押出し
36614	電気音響機械器具製造業
40981	非鉄金属卸売業
39501	装身具・装飾品製造業（貴金属・宝石製を除く）
36132	変圧器類製造業（電子機器用を除く）
39698	他に分類されないプラスチック製品製造業
33501	鉛第２次製錬・精製業（鉛合金製造業を含む）
35921	玉軸受・ころ軸受製造業
39404	毛筆・絵画用品製造業（鉛筆を除く）
36201	民生用電気機械器具製造業
34302	ガス機器・石油機器製造業
40831	配管・暖房・冷凍装置・同付属品卸売業
38431	医療用品製造業
35102	蒸気機関・タービン・水力タービン製造業（舶用を除く）
37602	航空機用原動機製造業
33154	メッキ鉄鋼線製造業
39621	軟質プラスチック発泡製品製造業（半硬質性を含む）
37191	自動車部分品・付属品製造業
34709	その他の金属線製品製造業
39671	プラスチック成形材料製造業
35951	金型・同部分品・付属品製造業
39131	宝石細工業
39613	合成皮革製造業
33721	アルミニウム・同合金ダイカスト製造業
33111	製鋼圧延を行う高炉による製鉄業
39881	看板・標識機製造業
34999	他に分類されない金属製品製造業
40971	鉄鋼卸売業
39907	モデル・模型製造業（紙製を除く）
34801	ボルト・ナット・リベット・小ねじ・木ねじ等製造業
35931	消火器具・消火装置製造業
38213	分析機器製造業
33405	ニッケル第１次製錬・精製業
36702	工業計器製造業
36131	発電機・電動機・その他の回転電気機械製造業
36909	他に分類されない電気機械器具製造業
39902	かつら製造業
36629	その他の電子部品製造業
39643	プラスチック継手製造業
33151	ブリキ製造業
35511	化学繊維機械・紡績機械製造業
36613	ラジオ受信機・テレビジョン受信機製造業
35692	鋳造装置製造業
40871	特殊産業用機械器具卸売業
33691	鉛・同合金圧延業（押出しを含む）
40621	電気機械器具卸売業（家庭用を除く）
36617	磁気テープ・磁気ディスク製造業
39401	万年筆・シャープペンシル・ペン先製造業
35201	農業用機械製造業（農業用器具を除く）
33391	鉄粉製造業
34204	作業工具製造業（やすりを除く）
39906	煙火製造業
36809	その他の電子応用装置製造業
39211	ピアノ製造業
38222	体積計製造業
39402	ボールペン・マーキングペン製造業
35641	印刷・製本・紙工機械製造業
34991	金庫製造業
33139	その他の製鋼を行わない鋼材製造業（表面処理鋼材を除く）
33132	冷間圧延業（鋼管，伸鉄を除く）
33121	転炉による製鋼・製鋼圧延業（単独転炉を含む）
33141	電気炉銑鉄製造業
37111	自動車製造業（二輪自動車を含む）
35441	機械工具製造業（粉末や金業を除く）
39219	その他の楽器・楽器部品・同材料製造業
33392	鉄鋼シャースリット業
33404	貴金属第１次製錬・精製業
38102	理化学機械器具製造業
35101	ボイラー製造業
36632	半導体素子製造業
38432	歯科材料製造業
35521	繊維機械部分品・取付具・付属品製造業
33201	銑鉄鋳物製造業（鋳鉄管，可鍛鋳鉄を除く）
33134	鋼管製造業
35411	金属工作機械製造業
35731	荷役運搬設備製造業
39622	硬質プラスチック発泡製品製造業
36621	抵抗器・コンデンサー・変成器・複合部品製造業
33138	伸線業
33311	鋳鋼製造業
39612	プラスチックシート製造業
38603	映画用機械・同付属品製造業
36631	電子管製造業
35891	事務用機械器具製造業
39692	プラスチック製容器製造業
33722	非鉄金属ダイカスト製造業（アルミニウム・同合金ダイカストを除
40861	光学機械・写真機械器具卸売業
35691	木工機械製造業
39641	プラスチック板・棒製造業
39302	人形製造業
33122	電気炉による製鋼・製鋼圧延業（単独電気炉を含む）
33203	鋳鉄管製造業
33621	アルミニウム・同合金圧延業（抽伸，押出しを含む）
39662	プラスチックフィルム・シート・床材・合成皮革加工業
35301	建設機械・鉱山機械製造業
34522	溶融メッキ業（表面処理鋼材製造業を除く）
34511	金属熱処理業
39644	プラスチック異形押出製品製造業
33406	アルミニウム第１次製錬・精製業
36801	電子計算機・同付属装置製造業
38413	動物用医療機械器具製造業
34523	金属彫刻業
37331	舶用機関製造業
39403	鉛筆製造業
40741	輸送用機械器具卸売業（自動車を除く）
39631	強化プラスチック製板・棒・管・継手製造業
34529	その他の金属表面処理業
35741	油圧・空圧機器製造業
33143	フェロアロイ製造業
39409	他に分類されない事務用品製造業
35302	トラクター製造業
37701	ロケット・同付属品製造業
35711	ポンプ・同装置製造業
36611	有線通信機械器具製造業
37609	その他の航空機部分品・補助装置製造業
39645	プラスチック床材製造業
35761	動力伝導装置製造業（玉軸受，ころ軸受を除く）
34911	金属製スプリング製造業
34541	金属プレス製品製造業（アルミニウム・同合金を除く）
33153	メッキ鋼管製造業
35899	その他の事務用・サービス用・民生用機械器具製造業
39301	娯楽用具・がん具製造業（人形，児童乗物を除く）
33152	亜鉛鉄板製造業
33312	鍛工品製造業
36616	音響部品・磁気ヘッド・小型モーター製造業
33137	引抜鋼管製造業
38602	写真機・同付属品製造業
37402	鉄道車両用部分品製造業
35771	工業窯炉製造業
40899	その他の一般機械器具卸売業
36502	電気照明器具製造業
39112	宝石付属品・同材料加工業
34206	手引のこぎり・のこ刃製造業
33313	鍛鋼製造業
39623	発泡・強化プラスチック製品加工業
35631	製紙機械・パルプ装置製造業
35732	産業用ロボット製造業
33503	アルミニウム第２次製錬・精製業（アルミニウム合金製造業を含む
38412	歯科用機械器具製造業
36624	プリント回路製造業
33407	チタン第１次製錬・精製業
33502	亜鉛第２次製錬・精製業（亜鉛合金製造業を含む）
39651	工業用プラスチック製品製造業（加工業を除く）
39304	運動用具製造業
33409	その他の非鉄金属第１次製錬・精製業
34202	機械刃物製造業
39905	魔法瓶製造業
34531	アルミニウム・同合金プレス製品製造業
36633	集積回路製造業
37401	鉄道車両製造業
35811	縫製機械製造業
38223	はかり製造業
38214	試験機製造業
34301	配管工事用付属品製造業（バルブ，コックを除く）
36111	配線器具・配線付属品製造業
36622	コネクター・スイッチ・リレー製造業
36191	電気溶接機製造業
37121	自動車車体・付随車製造業
35911	弁・同付属品製造業
34207	農業用器具製造業（農業用機械を除く）
34303	温風・温水暖房装置製造業
35699	他に分類されないその他の特殊産業用機械製造業
35721	エレベーター・エスカレーター製造業
34201	洋食器製造業
38101	測量機械器具製造業
40611	家庭用電気機械器具卸売業
36803	ビデオ機器製造業
38219	その他の計量器・測定器・分析機器・試験機製造業
33135	伸鉄業
39212	ギター製造業
39691	プラスチック製日用雑貨・食卓用品製造業
39642	プラスチック管製造業
33133	冷間ロール成型形鋼製造業
36623	スイッチング電源・高周波組立部品・コントロールユニット製造業
35513	染色整理仕上機械製造業
35799	その他の一般産業用機械・装置製造業
40841	金属加工機械卸売業
39821	畳製造業
39901	コルク加工基礎資材・コルク製品製造業
34524	電気メッキ業（表面処理鋼材製造業を除く）
33403	亜鉛第１次製錬・精製業
38702	時計側製造業
35941	ピストンリング製造業
33401	銅第１次製錬・精製業
36802	Ｘ線装置製造業
36141	内燃機関電装品製造業
34432	パレット製造業（金属製以外を含む）
39502	造花・装飾用羽毛製造業
33159	その他の表面処理鋼材製造業
36703	医療用計測器製造業
34205	やすり製造業
37321	木船製造・修理業
34521	金属製品塗装業
34411	建設用金属製品製造業
39672	廃プラスチック製品製造業
37341	船体ブロック製造業
36901	蓄電池製造業
34203	利器工匠具・手道具製造業（やすり，のこぎり，食卓用刃物を除く
38212	精密測定器製造業
33801	電線・ケーブル製造業（光ファイバーケーブルを除く）
35971	パイプ加工・パイプ付属品加工業
39699	他に分類されないプラスチック製品加工業
39503	ボタン製造業
33393	鉄スクラップ加工処理業
39701	漆器製造業
41931	プラスチック板・棒・管・フィルム・合成皮革卸売業
37322	舟艇製造・修理業
35109	その他の原動機製造業
35431	金属工作機械用・金属加工機械用部分品・付属品製造業（機械工具
39908	工業用模型製造業
34421	建築用金属製品製造業（建築用金物を除く）
36615	交通信号保安装置製造業
38224	温度計製造業
33999	他に分類されない非鉄金属製造業
33136	磨棒鋼製造業
37141	自動車駆動・操縦・制動装置製造業
39221	情報記録物製造業（新聞，書籍等の印刷物を除く）
35103	はん用内燃機関製造業
39652	工業用プラスチック製品加工業
36804	医療用電子応用装置製造業
38701	時計・同部分品製造業（時計側を除く）
37901	産業用運搬車両・同部分品・付属品製造業
38601	顕微鏡・望遠鏡等製造業
33991	非鉄金属鍛造品製造業
35712	空気圧縮機・ガス圧縮機・送風機製造業
35611	食料品加工機械製造業
34551	粉末や金製品製造業
35661	プラスチック加工機械・同付属装置製造業
35991	各種機械・同部分品製造修理業（注文製造・修理）
34701	くぎ製造業
35512	製織機械・編組機械製造業
39903	傘・同部分品製造業
39111	貴金属製品製造業
34431	製缶板金業
36902	一次電池（乾電池，湿電池）製造業
33712	非鉄金属鋳物製造業（銅・同合金鋳物及びダイカストを除く）
35693	半導体製造装置製造業
33911	核燃料製造業
39303	児童乗物製造業
40851	精密機械器具卸売業
35781	化学機械・同装置製造業
\.


--
-- Data for Name: company_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_information (company_id, company_name, headquarters_location, location_area, capital, regular_customer, establishment_year, number_of_employees, representative, operating_profit, capital_ratio, company_introduction, hp_link, image_path, staff_message, update_date, update_year, business_type_id, sales) FROM stdin;
2503930820	F社	茨城県ひたちなか市	日本茨城県	23000	ｘｘｘ社	1996	1580	xxx	68300	60	F者	https://www.google.com/	com-img-624714	F者	2023-03-06 13:38:00	2023	36703	33267
5800884510	G社	大阪府大阪市	日本大阪府	8184	ｘｘｘ社	1953	110	xxx	31056	\N	G者	https://www.google.com/	com-img-624714	G者	2023-03-06 13:38:00	2023	33801	7211
1300734030	H社	岩手県北上市	日本岩手県	1300	ｘｘｘ社	1973	64	xxx	-862	11	H者	https://www.google.com/	com-img-624714	H者	2023-03-06 13:38:00	2023	34431	857
6600509220	I社	山口県萩市	日本山口県	5000	ｘｘｘ社	1968	24	xxx	0	\N	I者	https://www.google.com/	com-img-779159	I者	2023-03-06 13:38:00	2023	35693	350
6400058680	J社	山口県周南市	日本山口県	4500	ｘｘｘ社	1951	148	xxx	6618	17	J者	https://www.google.com/	com-img-779159	J者	2023-03-06 13:38:00	2023	33393	3756
5800160590	K社	大阪府大阪市	日本大阪府	10000	ｘｘｘ社	1941	81	xxx	26487	62	K者	https://www.google.com/	com-img-779159	K者	2023-03-06 13:38:00	2023	40621	13911
2405326010	L社	栃木県矢板市	日本栃木県	1000	ｘｘｘ社	1989	6	xxx	108	\N	L者	https://www.google.com/	com-img-779159	L者	2023-03-06 13:38:00	2023	35431	165
9857717310	M社	神奈川県川崎市	日本神奈川県	50000	ｘｘｘ社	1961	218	xxx	0	\N	M者	https://www.google.com/	com-img-779159	M者	2023-03-06 13:38:00	2023	40621	61000
9856103290	S社	茨城県ひたちなか市	日本茨城県	3304	ｘｘｘ社	1963	31	xxx	5594	24	S者	https://www.google.com/	com-img-624714.4	S者	2023-03-06 13:38:00	2023	40621	2430
2004445400	株式会社マクニカ	神奈川県横浜市	日本神奈川県	1119400	日本電気、富士通、三菱電機、パナソニックホールディングス、アドバンテスト	1972	2000	会　長　　中島　潔	2918500	44	担当者	https://www.google.com/	com-img-624714.4	担当者	2023-03-06 13:38:00	2023	40621	424264
9854633030	東亜電気工業株式会社	東京都千代田区	日本東京都	45068	デンソー、日産自動車、メルコ・ディスプレイ・テクノロ、三菱電機、クラベ	1947	284	社　長　　重田　明生	118600	50	担当者	https://www.google.com/	com-img-624714.4	担当者	2023-03-06 13:38:00	2023	40621	57335
2014351060	株式会社パルテック	神奈川県横浜市	日本神奈川県	31000	日本電気、オリンパス、ソニーグローバルマニュファクチ、キーエンス、三菱電機	1977	241	社　長　　高橋　忠仁	10000	50	担当者	https://www.google.com/	com-img-624714.4	担当者	2023-03-06 13:38:00	2023	40621	30000
2007595490	A社	神奈川県相模原市	日本神奈川県	2400	ｘｘｘ社	1969	58	xxx	7365	\N	A者	https://www.google.com/	com-img-624714.4	A者	2023-03-06 13:38:00	2023	34431	1791
1301461250	B社	岩手県盛岡市	日本岩手県	3000	ｘｘｘ社	1966	32	xxx	855	20	B者	https://www.google.com/	com-img-624714.4	B者	2023-03-06 13:38:00	2023	34531	463
9853454080	C社	東京都千代田区	日本東京都	181923	ｘｘｘ社	1952	359	xxx	226538	54	C者	https://www.google.com/	com-img-624714	C者	2023-03-06 13:38:00	2023	40621	59110
8703147070	D社	熊本県宇城市	日本熊本県	3000	ｘｘｘ社	1988	80	xxx	7000	\N	D社	https://www.google.com/	com-img-624714	D社	2023-03-06 13:38:00	2023	35693	1201
2002199850	E社	神奈川県横浜市	日本神奈川県	3500	ｘｘｘ社	1961	416	xxx	47700	40	E者	https://www.google.com/	com-img-624714	E者	2023-03-06 13:38:00	2023	34999	11196
2009887200	N社	神奈川県横浜市	日本神奈川県	249575	ｘｘｘ社	1986	971	xxx	318500	27	N者	https://www.google.com/	com-img-779159	N者	2023-03-06 13:38:00	2023	40621	152229
2300921250	O社	群馬県邑楽郡	日本群馬県	500	ｘｘｘ社	1969	32	xxx	3559	83	O者	https://www.google.com/	com-img-779159	O者	2023-03-06 13:38:00	2023	34431	710
9856214110	P社	東京都港区	日本東京都	20000	ｘｘｘ社	1972	200	xxx	50116	34	P者	https://www.google.com/	com-img-779159	P者	2023-03-06 13:38:00	2023	40621	29212
2301641350	Q社	群馬県邑楽郡	日本群馬県	500	ｘｘｘ社	1976	5	xxx	180	\N	Q者	https://www.google.com/	com-img-624714.4	Q者	2023-03-06 13:38:00	2023	34431	100
9857141090	R社	東京都千代田区	日本東京都	1769000	ｘｘｘ社	1949	610	xxx	284800	49	R者	https://www.google.com/	com-img-624714.4	R者	2023-03-06 13:38:00	2023	40621	170645
\.


--
-- Data for Name: evaluation_detail_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluation_detail_item (company_id, item_category_id, item_id, relevant_score, score, parameter, value, update_date, update_year, item_category_group_id, min_value, bottom_25per_value, median_value, top_25per_value, max_value) FROM stdin;
2004445400	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9853454080	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9857717310	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2009887200	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9857141090	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2014351060	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2405326010	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9856103290	43220000	43223100	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2004445400	43220000	43223300	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9853454080	43220000	43223300	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9854633030	43220000	43223300	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2009887200	43220000	43223300	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
5800884510	43220000	43223300	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9856103290	43220000	43223300	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
5800160590	43220000	43223100	cost_score	40	単価変動係数	1.38220918	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2007595490	43220000	43223100	cost_score	32.5	単価変動係数	0.969958115	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2004445400	43220000	43223100	cost_score	30	単価変動係数	15.3560708	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2301641350	43220000	43223100	cost_score	55	単価変動係数	0.570653061	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2300921250	43220000	43223100	cost_score	35	単価変動係数	1.173191126	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
9853454080	43220000	43223100	cost_score	17.5	単価変動係数	1.482497351	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
9854633030	43220000	43223100	cost_score	35	単価変動係数	2.675022171	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
9857717310	43220000	43223100	cost_score	22.5	単価変動係数	3.353971047	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2009887200	43220000	43223100	cost_score	10	単価変動係数	3.268272491	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
9857141090	43220000	43223100	cost_score	25	単価変動係数	4.091606319	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2503930820	43220000	43223100	cost_score	65	単価変動係数	0	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
9856214110	43220000	43223100	cost_score	12.5	単価変動係数	2.332113388	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2014351060	43220000	43223100	cost_score	67.5	単価変動係数	0	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
2405326010	43220000	43223100	cost_score	42.5	単価変動係数	0.682313489	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
9856103290	43220000	43223100	cost_score	30	単価変動係数	1.954438592	2023-03-06 20:50:00	2023	43000000	0	0	0.284300985	0.966888824	15.3560708
5800160590	43220000	43223100	cost_score	40	平均単価	688.3325904	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2007595490	43220000	43223100	cost_score	32.5	平均単価	2261.841667	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2004445400	43220000	43223100	cost_score	30	平均単価	1073.111166	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2301641350	43220000	43223100	cost_score	55	平均単価	351.9942623	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2300921250	43220000	43223100	cost_score	35	平均単価	1396.213095	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
9853454080	43220000	43223100	cost_score	17.5	平均単価	15314.22667	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
9854633030	43220000	43223100	cost_score	35	平均単価	710.8	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
9857717310	43220000	43223100	cost_score	22.5	平均単価	2014.118914	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2009887200	43220000	43223100	cost_score	10	平均単価	26088.89245	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
9857141090	43220000	43223100	cost_score	25	平均単価	1876.056522	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2503930820	43220000	43223100	cost_score	65	平均単価	5853	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
9856214110	43220000	43223100	cost_score	12.5	平均単価	28309.75008	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2014351060	43220000	43223100	cost_score	67.5	平均単価	4186	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
2405326010	43220000	43223100	cost_score	42.5	平均単価	1120.967742	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
9856103290	43220000	43223100	cost_score	30	平均単価	1226.02439	2023-03-06 20:50:00	2023	43000000	0.088724395	206.0086957	1097.039454	6457.5	3920000
5800160590	43220000	43223300	cost_score	27.5	単価変動係数	3.273142941	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
1300734030	43220000	43223300	cost_score	37.5	単価変動係数	1.266528647	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
1301461250	43220000	43223300	cost_score	45	単価変動係数	1.202288497	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
6400058680	43220000	43223300	cost_score	40	単価変動係数	0.982764442	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
6600509220	43220000	43223300	cost_score	40	単価変動係数	1.086169662	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
8703147070	43220000	43223300	cost_score	42.5	単価変動係数	1.125634893	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
2004445400	43220000	43223300	cost_score	40	単価変動係数	1.242042212	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
2301641350	43220000	43223300	cost_score	67.5	単価変動係数	0.247367409	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
2300921250	43220000	43223300	cost_score	62.5	単価変動係数	0.487122291	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
9853454080	43220000	43223300	cost_score	7.5	単価変動係数	5.54684291	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
9854633030	43220000	43223300	cost_score	32.5	単価変動係数	1.307675532	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
9857717310	43220000	43223300	cost_score	100	単価変動係数	0	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
2009887200	43220000	43223300	cost_score	22.5	単価変動係数	2.306593969	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
5800884510	43220000	43223300	cost_score	82.5	単価変動係数	0.008054508	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
2002199850	43220000	43223300	cost_score	35	単価変動係数	1.034368639	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
2503930820	43220000	43223300	cost_score	95	単価変動係数	0	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
9856214110	43220000	43223300	cost_score	35	単価変動係数	0.370406305	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
9856103290	43220000	43223300	cost_score	20	単価変動係数	12.11028135	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
5800160590	43220000	43223300	cost_score	27.5	平均単価	4875.974468	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2007595490	43220000	43223300	cost_score	37.5	平均単価	4531.303988	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
1300734030	43220000	43223300	cost_score	37.5	平均単価	3840.304792	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
1301461250	43220000	43223300	cost_score	45	平均単価	1779.969157	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
6400058680	43220000	43223300	cost_score	40	平均単価	4922.971242	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
6600509220	43220000	43223300	cost_score	40	平均単価	2890.95155	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
8703147070	43220000	43223300	cost_score	42.5	平均単価	2205.559505	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2004445400	43220000	43223300	cost_score	40	平均単価	2919.564287	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2301641350	43220000	43223300	cost_score	67.5	平均単価	866.5942857	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2300921250	43220000	43223300	cost_score	62.5	平均単価	825.8107059	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
9853454080	43220000	43223300	cost_score	7.5	平均単価	115068.1213	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
9854633030	43220000	43223300	cost_score	32.5	平均単価	5930.839254	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
9857717310	43220000	43223300	cost_score	100	平均単価	1.32	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2009887200	43220000	43223300	cost_score	22.5	平均単価	14148.52602	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
5800884510	43220000	43223300	cost_score	82.5	平均単価	26.71916859	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2002199850	43220000	43223300	cost_score	35	平均単価	9441.629006	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
2503930820	43220000	43223300	cost_score	95	平均単価	177	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
9856214110	43220000	43223300	cost_score	35	平均単価	91839.98795	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
9856103290	43220000	43223300	cost_score	20	平均単価	13101.28671	2023-03-06 20:50:00	2023	43000000	1.32	672.5	3910.3	25821.00445	3543906.452
5800160590	43220000	43223100	delivery_score	90	平均納入LT	13	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
2004445400	43220000	43223100	delivery_score	42.5	平均納入LT	41	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
9853454080	43220000	43223100	delivery_score	60	平均納入LT	33	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
9854633030	43220000	43223100	delivery_score	80	平均納入LT	23	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
9857717310	43220000	43223100	delivery_score	15	平均納入LT	80	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
2009887200	43220000	43223100	delivery_score	77.5	平均納入LT	35	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
9857141090	43220000	43223100	delivery_score	40	平均納入LT	42	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
9856214110	43220000	43223100	delivery_score	95	平均納入LT	10	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
2014351060	43220000	43223100	delivery_score	5	平均納入LT	114	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
2405326010	43220000	43223100	delivery_score	80	平均納入LT	34	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
9856103290	43220000	43223100	delivery_score	40	平均納入LT	53	2023-03-06 20:50:00	2023	43000000	7	26	42	58	402
5800160590	43220000	43223100	delivery_score	90	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
2004445400	43220000	43223100	delivery_score	42.5	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
9853454080	43220000	43223100	delivery_score	60	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
9854633030	43220000	43223100	delivery_score	80	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
9857717310	43220000	43223100	delivery_score	15	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
2009887200	43220000	43223100	delivery_score	77.5	納期不遵守率	0	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
9857141090	43220000	43223100	delivery_score	40	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
9856214110	43220000	43223100	delivery_score	95	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
2014351060	43220000	43223100	delivery_score	5	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
2405326010	43220000	43223100	delivery_score	80	納期不遵守率	0	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
9856103290	43220000	43223100	delivery_score	40	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.55	1	1
5800160590	43220000	43223300	delivery_score	75	平均納入LT	18	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
2004445400	43220000	43223300	delivery_score	22.5	平均納入LT	57	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
9853454080	43220000	43223300	delivery_score	65	平均納入LT	23	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
9854633030	43220000	43223300	delivery_score	15	平均納入LT	65	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
2009887200	43220000	43223300	delivery_score	25	平均納入LT	53	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
5800884510	43220000	43223300	delivery_score	90	平均納入LT	9	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
2503930820	43220000	43223300	delivery_score	65	平均納入LT	22	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
9856103290	43220000	43223300	delivery_score	20	平均納入LT	61	2023-03-06 20:50:00	2023	43000000	0	13	28	47	156
5800160590	43220000	43223300	delivery_score	75	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
2004445400	43220000	43223300	delivery_score	22.5	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
9853454080	43220000	43223300	delivery_score	65	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
9854633030	43220000	43223300	delivery_score	15	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
2009887200	43220000	43223300	delivery_score	25	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
5800884510	43220000	43223300	delivery_score	90	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
2503930820	43220000	43223300	delivery_score	65	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
9856103290	43220000	43223300	delivery_score	20	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.166666667	0.384615385	1
2007595490	43220000	43223300	cost_score	37.5	単価変動係数	1.136449561	2023-03-06 20:50:00	2023	43000000	0	0	0.374565504	1.062871947	12.11028135
\.


--
-- Data for Name: evaluation_detail_item_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluation_detail_item_category (company_id, item_category_id, relevant_score, score, parameter, value, update_date, update_year, item_category_group_id, min_value, bottom_25per_value, median_value, top_25per_value, max_value) FROM stdin;
5800160590	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2004445400	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9853454080	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9854633030	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9857717310	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2009887200	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
5800884510	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9857141090	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9856214110	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2014351060	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
2405326010	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
9856103290	43220000	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	0
5800160590	43220000	cost_score	27.5	単価変動係数	5.917386484	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2007595490	43220000	cost_score	42.5	単価変動係数	1.325253369	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
1300734030	43220000	cost_score	35	単価変動係数	1.818990046	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
1301461250	43220000	cost_score	37.5	単価変動係数	2.74767965	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
6400058680	43220000	cost_score	45	単価変動係数	0.98134797	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
6600509220	43220000	cost_score	47.5	単価変動係数	1.155039727	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
8703147070	43220000	cost_score	47.5	単価変動係数	1.211456699	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2004445400	43220000	cost_score	35	単価変動係数	7.852132104	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2301641350	43220000	cost_score	65	単価変動係数	0.61670297	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2300921250	43220000	cost_score	50	単価変動係数	1.956977057	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
9853454080	43220000	cost_score	10	単価変動係数	6.950466616	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
9854633030	43220000	cost_score	22.5	単価変動係数	2.186742585	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
9857717310	43220000	cost_score	37.5	単価変動係数	3.38656655	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2009887200	43220000	cost_score	17.5	単価変動係数	2.196570059	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
5800884510	43220000	cost_score	87.5	単価変動係数	0.008054508	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
9857141090	43220000	cost_score	27.5	単価変動係数	2.213139403	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2002199850	43220000	cost_score	37.5	単価変動係数	1.133734112	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2503930820	43220000	cost_score	47.5	単価変動係数	2.690373719	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
9856214110	43220000	cost_score	22.5	単価変動係数	3.9113376	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2014351060	43220000	cost_score	32.5	単価変動係数	1.90295927	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
2405326010	43220000	cost_score	37.5	単価変動係数	1.963772995	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
9856103290	43220000	cost_score	20	単価変動係数	13.17064462	2023-03-06 20:50:00	2023	43000000	0	0.010153285	0.601797455	1.342539778	53.90661634
5800160590	43220000	cost_score	27.5	平均単価	4049.22588	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2007595490	43220000	cost_score	42.5	平均単価	3057.530811	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
1300734030	43220000	cost_score	35	平均単価	4154.819108	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
1301461250	43220000	cost_score	37.5	平均単価	1874.045808	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
6400058680	43220000	cost_score	45	平均単価	4672.669688	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
6600509220	43220000	cost_score	47.5	平均単価	2217.685842	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
8703147070	43220000	cost_score	47.5	平均単価	1685.028029	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2004445400	43220000	cost_score	35	平均単価	1707.682259	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2301641350	43220000	cost_score	65	平均単価	456.618617	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2300921250	43220000	cost_score	50	平均単価	582.0284652	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
9853454080	43220000	cost_score	10	平均単価	64253.26918	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
9854633030	43220000	cost_score	22.5	平均単価	16187.32613	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
9857717310	43220000	cost_score	37.5	平均単価	1978.470444	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2009887200	43220000	cost_score	17.5	平均単価	36977.91955	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
5800884510	43220000	cost_score	87.5	平均単価	26.71916859	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
9857141090	43220000	cost_score	27.5	平均単価	7097.213624	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2002199850	43220000	cost_score	37.5	平均単価	7482.225025	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2503930820	43220000	cost_score	47.5	平均単価	277.7992278	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
9856214110	43220000	cost_score	22.5	平均単価	8793.791496	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2014351060	43220000	cost_score	32.5	平均単価	4910.58	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
2405326010	43220000	cost_score	37.5	平均単価	3102.682927	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
9856103290	43220000	cost_score	20	平均単価	10048.61501	2023-03-06 20:50:00	2023	43000000	0.088724395	689.8786857	3520.454545	19228.16445	3920000
5800160590	43220000	delivery_score	5	平均納入LT	187	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
2004445400	43220000	delivery_score	35	平均納入LT	40	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
9853454080	43220000	delivery_score	35	平均納入LT	46	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
9854633030	43220000	delivery_score	15	平均納入LT	66	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
9857717310	43220000	delivery_score	10	平均納入LT	80	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
2009887200	43220000	delivery_score	62.5	平均納入LT	55	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
5800884510	43220000	delivery_score	90	平均納入LT	9	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
9857141090	43220000	delivery_score	17.5	平均納入LT	82	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
2503930820	43220000	delivery_score	70	平均納入LT	22	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
9856214110	43220000	delivery_score	85	平均納入LT	14	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
2014351060	43220000	delivery_score	15	平均納入LT	64	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
2405326010	43220000	delivery_score	55	平均納入LT	35	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
9856103290	43220000	delivery_score	22.5	平均納入LT	58	2023-03-06 20:50:00	2023	43000000	0	19	32	53	402
5800160590	43220000	delivery_score	5	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
2004445400	43220000	delivery_score	35	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
9853454080	43220000	delivery_score	35	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
9854633030	43220000	delivery_score	15	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
9857717310	43220000	delivery_score	10	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
2009887200	43220000	delivery_score	62.5	納期不遵守率	0	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
5800884510	43220000	delivery_score	90	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
9857141090	43220000	delivery_score	17.5	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
2503930820	43220000	delivery_score	70	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
9856214110	43220000	delivery_score	85	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
2014351060	43220000	delivery_score	15	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
2405326010	43220000	delivery_score	55	納期不遵守率	0.011627907	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
9856103290	43220000	delivery_score	22.5	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.147058824	0.763888889	1
\.


--
-- Data for Name: evaluation_detail_item_category_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluation_detail_item_category_group (company_id, relevant_score, score, parameter, value, update_date, update_year, item_category_group_id, min_value, bottom_25per_value, median_value, top_25per_value, max_value) FROM stdin;
5800160590	quality_score	5	不良率	5.6e-07	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
2004445400	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
9853454080	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
9854633030	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
9857717310	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
2009887200	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
5800884510	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
9857141090	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
9856214110	quality_score	5	不良率	0.001594896	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
2014351060	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
2405326010	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
9856103290	quality_score	100	不良率	0	2023-03-06 20:50:00	2023	43000000	0	0	0	0	1
5800160590	cost_score	25	単価変動係数	25.89068698	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2007595490	cost_score	47.5	単価変動係数	1.369574316	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
1300734030	cost_score	42.5	単価変動係数	1.643561575	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
1301461250	cost_score	45	単価変動係数	2.195607099	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
6400058680	cost_score	50	単価変動係数	1.211556855	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
6600509220	cost_score	52.5	単価変動係数	1.294030421	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
8703147070	cost_score	52.5	単価変動係数	1.365720721	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2004445400	cost_score	25	単価変動係数	56.28135705	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2301641350	cost_score	67.5	単価変動係数	0.895533659	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2300921250	cost_score	52.5	単価変動係数	2.209284761	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
9853454080	cost_score	20	単価変動係数	10.11749028	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
9854633030	cost_score	25	単価変動係数	28.06955485	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
9857717310	cost_score	45	単価変動係数	59.68665301	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2009887200	cost_score	15	単価変動係数	5.898667648	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
5800884510	cost_score	32.5	単価変動係数	19.70641413	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
9857141090	cost_score	20	単価変動係数	7.595807579	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2002199850	cost_score	22.5	単価変動係数	3.199701554	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2503930820	cost_score	37.5	単価変動係数	4.800832251	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
9856214110	cost_score	17.5	単価変動係数	16.09324656	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2014351060	cost_score	22.5	単価変動係数	8.693391079	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
2405326010	cost_score	35	単価変動係数	2.823050381	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
9856103290	cost_score	22.5	単価変動係数	27.02200446	2023-03-06 20:50:00	2023	43000000	0	0.263929922	0.949922595	2.021156555	78.33371666
5800160590	cost_score	25	平均単価	7665.898325	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2007595490	cost_score	47.5	平均単価	2906.822257	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
1300734030	cost_score	42.5	平均単価	4079.862162	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
1301461250	cost_score	45	平均単価	1594.622869	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
6400058680	cost_score	50	平均単価	3367.787231	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
6600509220	cost_score	52.5	平均単価	1602.404551	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
8703147070	cost_score	52.5	平均単価	1345.891193	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2004445400	cost_score	25	平均単価	8326.329101	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2301641350	cost_score	67.5	平均単価	284.8945101	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2300921250	cost_score	52.5	平均単価	339.2907477	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
9853454080	cost_score	20	平均単価	16580.26635	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
9854633030	cost_score	25	平均単価	7178.435275	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
9857717310	cost_score	45	平均単価	150.107128	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2009887200	cost_score	15	平均単価	78797.43562	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
5800884510	cost_score	32.5	平均単価	1971.473092	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
9857141090	cost_score	20	平均単価	18406.65943	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2002199850	cost_score	22.5	平均単価	22068.76884	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2503930820	cost_score	37.5	平均単価	1258.475291	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
9856214110	cost_score	17.5	平均単価	29221.19229	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2014351060	cost_score	22.5	平均単価	11721.76981	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
2405326010	cost_score	35	平均単価	4552.514418	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
9856103290	cost_score	22.5	平均単価	10197.29854	2023-03-06 20:50:00	2023	43000000	0.183020736	344.7455797	4053.814599	39264.19444	1234567890
5800160590	delivery_score	20	平均納入LT	62	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
2004445400	delivery_score	25	平均納入LT	48	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
9853454080	delivery_score	40	平均納入LT	51	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
9854633030	delivery_score	75	平均納入LT	20	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
9857717310	delivery_score	45	平均納入LT	39	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
2009887200	delivery_score	42.5	平均納入LT	48	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
5800884510	delivery_score	90	平均納入LT	9	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
9857141090	delivery_score	30	平均納入LT	43	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
2503930820	delivery_score	50	平均納入LT	36	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
9856214110	delivery_score	25	平均納入LT	59	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
2014351060	delivery_score	35	平均納入LT	50	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
2405326010	delivery_score	57.5	平均納入LT	39	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
9856103290	delivery_score	22.5	平均納入LT	55	2023-03-06 20:50:00	2023	43000000	0	17	34	55	776
5800160590	delivery_score	20	納期不遵守率	0.987517337	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
2004445400	delivery_score	25	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
9853454080	delivery_score	40	納期不遵守率	0.224137931	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
9854633030	delivery_score	75	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
9857717310	delivery_score	45	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
2009887200	delivery_score	42.5	納期不遵守率	0.214285714	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
5800884510	delivery_score	90	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
9857141090	delivery_score	30	納期不遵守率	0.849901251	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
2503930820	delivery_score	50	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
9856214110	delivery_score	25	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
2014351060	delivery_score	35	納期不遵守率	\N	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
2405326010	delivery_score	57.5	納期不遵守率	0.014634146	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
9856103290	delivery_score	22.5	納期不遵守率	1	2023-03-06 20:50:00	2023	43000000	0	0	0.206286837	0.6	1
\.


--
-- Data for Name: evaluation_result_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluation_result_item (company_id, item_category_id, item_id, quality_score, cost_score, delivery_score, finance_score, environment_score, labor_score, ethics_score, sustainable_score, update_date, update_year, item_category_group_id) FROM stdin;
2004445400	43220000	43223100	100	30	42.5	64	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2004445400	43220000	43223300	100	40	22.5	64	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9853454080	43220000	43223100	100	17.5	60	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9853454080	43220000	43223300	100	7.5	65	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9854633030	43220000	43223300	100	32.5	15	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857717310	43220000	43223100	100	22.5	15	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2009887200	43220000	43223100	100	10	77.5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2009887200	43220000	43223300	100	22.5	25	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
5800884510	43220000	43223300	100	82.5	85	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857141090	43220000	43223100	100	25	40	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2014351060	43220000	43223100	100	67.5	5	48	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2405326010	43220000	43223100	100	42.5	80	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856103290	43220000	43223100	100	30	35	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856103290	43220000	43223300	100	20	20	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
5800160590	43220000	43223100	\N	40	90	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
5800160590	43220000	43223300	\N	27.5	75	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2007595490	43220000	43223100	\N	32.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2007595490	43220000	43223300	\N	37.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
1300734030	43220000	43223300	\N	37.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
1301461250	43220000	43223300	\N	45	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
6400058680	43220000	43223300	\N	40	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
6600509220	43220000	43223300	\N	40	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
8703147070	43220000	43223300	\N	42.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2301641350	43220000	43223100	\N	55	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2301641350	43220000	43223300	\N	67.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2300921250	43220000	43223100	\N	35	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2300921250	43220000	43223300	\N	62.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9854633030	43220000	43223100	\N	35	80	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857717310	43220000	43223300	\N	100	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2002199850	43220000	43223300	\N	35	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2503930820	43220000	43223100	\N	65	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2503930820	43220000	43223300	\N	95	65	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856214110	43220000	43223100	\N	12.5	95	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856214110	43220000	43223300	\N	35	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
\.


--
-- Data for Name: evaluation_result_item_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluation_result_item_category (company_id, item_category_id, quality_score, cost_score, delivery_score, finance_score, environment_score, labor_score, ethics_score, sustainable_score, update_date, update_year, item_category_group_id) FROM stdin;
5800160590	43220000	100	27.5	5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2004445400	43220000	100	35	35	64	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9853454080	43220000	100	10	35	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9854633030	43220000	100	22.5	15	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857717310	43220000	100	37.5	10	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2009887200	43220000	100	17.5	62.5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
5800884510	43220000	100	87.5	90	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857141090	43220000	100	27.5	17.5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856214110	43220000	100	22.5	85	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2014351060	43220000	100	32.5	15	48	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2405326010	43220000	100	37.5	55	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856103290	43220000	100	20	22.5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2007595490	43220000	\N	42.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
1300734030	43220000	\N	35	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
1301461250	43220000	\N	37.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
6400058680	43220000	\N	45	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
6600509220	43220000	\N	47.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
8703147070	43220000	\N	47.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2301641350	43220000	\N	65	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2300921250	43220000	\N	50	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2002199850	43220000	\N	37.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2503930820	43220000	\N	47.5	70	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
\.


--
-- Data for Name: evaluation_result_item_category_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluation_result_item_category_group (company_id, quality_score, cost_score, delivery_score, finance_score, environment_score, labor_score, ethics_score, sustainable_score, update_date, update_year, item_category_group_id) FROM stdin;
5800160590	5	25	20	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2004445400	100	25	25	64	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9853454080	100	20	40	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9854633030	100	25	75	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857717310	100	45	45	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2009887200	100	15	42.5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
5800884510	100	32.5	90	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9857141090	100	20	30	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856214110	5	17.5	25	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2014351060	100	22.5	30	48	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2405326010	100	35	57.5	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
9856103290	100	22.5	20	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2007595490	\N	47.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
1300734030	\N	42.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
1301461250	\N	45	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
6400058680	\N	50	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
6600509220	\N	52.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
8703147070	\N	52.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2301641350	\N	67.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2300921250	\N	52.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2002199850	\N	22.5	\N	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
2503930820	\N	37.5	50	80	80	\N	80	80	2023-03-06 17:58:00	2023	43000000
\.


--
-- Data for Name: item_category_group_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_category_group_information (item_category_group_id, item_category_group_name) FROM stdin;
10000000	生植物（植木）、動物の資材、付属品および供給品
11000000	鉱物、繊維、非食用の植物および動物の資材
12000000	生物化学品および気体資源を含む化学品
13000000	樹脂、ロジン、ゴム、発泡体、フィルムおよびエラストマー（弾性体資材［天然ゴム・合成ゴムなど］）用品
14000000	紙原材料および紙製品
15000000	燃料、燃料添加物、潤滑剤および防食剤
20000000	鉱山機械および付属品
21000000	農業、漁業、林業、野生生物装置類および付属品
22000000	ビル、建築機械類および付属品
23000000	産業製造処理機械類および付属品
24000000	資材運搬、調整および貯蔵用機械、付属品および供給品
25000000	商業用、軍事用、個人用の乗り物、それらの付属品および部品
26000000	発電、配電機械および付属品
27000000	ツールおよび一般機器
30000000	構造、建造、建築の建設用資材および供給品
31000000	製造用部品および供給品
32000000	電子部品および供給品
39000000	電気システムと照明および部品、付属品、供給品
40000000	給気、空調システムおよび機器と部品
41000000	ラボ用、計量、および観察、試験機器
42000000	医療機器および付属品と供給品
43000000	情報技術ブロードキャスティングおよび電気通信
44000000	事務用機器、付属品および供給品
45000000	印刷、写真、オーディオおよびビジュアル機器と供給品
46000000	防衛、法執行、警備、および安全機器と供給品
47000000	クリーニング装置および供給品
48000000	サービス産業用機械、機器および供給品
49000000	スポーツおよびレクレーション用品と供給品および付属品
50000000	食料品、飲料およびタバコ製品
51000000	薬および製薬製品
52000000	家庭用電化製品、供給品および消費者向け電子製品
53000000	衣服、手荷物類および衛生用品
54000000	時計、宝石および貴石
55000000	出版物
56000000	家具および備え付け家具
60000000	楽器、ゲーム、玩具、芸術、細工および教育の機器、道具、付属品および供給品
70000000	農業、漁業、林業および野生動物契約関連サービス
71000000	採鉱、石油、ガス・サービス
72000000	建物および施設の建設と修繕サービス
73000000	工業生産および製造サービス　
76000000	産業洗浄サービス
77000000	環境サービス
78000000	輸送、保管および郵便サービス
80000000	経営者、ビジネス専門家および管理サービス
81000000	エンジニアリング、リサーチ、テクノロジーベースサービス
82000000	編集、デザイン、グラフィック、およびファインアートサービス
83000000	公益事業および公共部門関連サービス
84000000	金融および保険サービス
85000000	ヘルスケアサービス
86000000	教育および研修サービス
90000000	旅行、食事、、宿泊および娯楽サービス
91000000	個人または家庭向けサービス
92000000	国防、治安、保安および安全サービス
93000000	政治および民事サービス
94000000	組織とクラブ
95000000	土地および建築物、構造体、道路
\.


--
-- Data for Name: item_category_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_category_information (item_category_id, item_category_name, item_category_group_id) FROM stdin;
10100000	生きた動物	10000000
10110000	家庭用ぺット製品	10000000
10120000	動物用飼料	10000000
10130000	動物用格納容器および小屋	10000000
10140000	馬具および引き具	10000000
10150000	種子、球根、苗木および切り枝	10000000
10160000	草花栽培および造林	10000000
10170000	肥料、植物用栄養剤および除草剤	10000000
10190000	害虫駆除製品	10000000
10200000	生花ローズブッシュ（バラの木）（バラの木）	10000000
10210000	高等種生植物（植木）または各種花	10000000
10220000	下等種生植物（植木）または各種花	10000000
10230000	生花クリサンセマム(キク)	10000000
10240000	生花カーネーション	10000000
10250000	生花蘭	10000000
10300000	新鮮なバラ（切花）	10000000
10310000	新鮮な高等花種（切花）または各種花	10000000
10320000	新鮮な下等花種（切花）または各種花	10000000
10330000	新鮮なクリサンセマム（切花）	10000000
10340000	新鮮なフローラル・ブーケ（切花）	10000000
10350000	新鮮なカーネーション（切花）	10000000
10360000	新鮮な蘭（切花）	10000000
10400000	ドライ・バラ（切り花）	10000000
10410000	ドライ高等花種（切花）または各種花	10000000
10420000	ドライ下等花種（切花）または各種花	10000000
10430000	ドライ・クリサンセマム（切花）	10000000
10440000	ドライ・カーネーション（切花）	10000000
10450000	ドライ蘭（切花）	10000000
10500000	新鮮な草木	10000000
11100000	鉱物、鉱石および金属	11000000
11110000	土および石	11000000
11120000	非食用植物および林産物	11000000
11130000	非食用動物製品	11000000
11140000	スクラップおよび廃棄物	11000000
11150000	繊維、糸および毛糸	11000000
11160000	織物および皮革材料	11000000
11170000	合金	11000000
11180000	金属酸化物	11000000
11190000	金属廃棄物スクラップおよび副産物	11000000
12130000	爆発物	12000000
12140000	元素およびガス	12000000
12160000	添加物	12000000
12170000	着色料	12000000
12180000	ワックスおよびオイル	12000000
12190000	溶剤	12000000
12350000	化合物および混合物	12000000
13100000	ゴムおよびエラストマー	13000000
13110000	樹脂、ロジンおよびその他の樹脂派生材料	13000000
14100000	紙原材料	14000000
14110000	紙製品	14000000
14120000	工業用紙	14000000
15100000	燃料	15000000
15110000	ガス状燃料および添加物	15000000
15120000	潤滑剤、オイル、グリースおよび腐食防止剤	15000000
15130000	原子炉燃料	15000000
20100000	鉱山および採石機械設備	20000000
20110000	削井および操作機械	20000000
20120000	石油とガスの掘削および探鉱用機械設備	20000000
20130000	石油とガス堀削および操作資材	20000000
20140000	オイルおよびガス操作および製造機械	20000000
21100000	農業、林業、造園装置類	21000000
21110000	釣りおよび養殖設備	21000000
22100000	建設用重機	22000000
23100000	原材料加工機械類	23000000
23110000	石油加工機械類	23000000
23120000	テキスタイルおよびファブリック機械類および付属品	23000000
23130000	宝石加工機械設備	23000000
23140000	皮革加工修理機械類および設備	23000000
23150000	工業加工用機械設備および供給品	23000000
23160000	鋳造機械設備および供給品	23000000
23180000	食品および飲料産業機械設備	23000000
23190000	ミキサー、部品および付属品	23000000
23200000	大量輸送設備	23000000
23210000	電子製造機械設備および付属品	23000000
23220000	鶏肉加工機械設備	23000000
23230000	製材加工機械設備	23000000
23240000	工作機械および付属品	23000000
23250000	金属成形機および付属品	23000000
23260000	ラピッドプロトタイピング機および付属品	23000000
23270000	溶接機、はんだ付け機、ろう付け機および付属品や用品	23000000
23280000	金属処理機械	23000000
23290000	産業用工作機械	23000000
23300000	ワイヤー装置	23000000
24100000	資材運搬用機械類および設備	24000000
24110000	コンテナおよぴ貯蔵庫	24000000
24120000	梱包材	24000000
24130000	産業用冷却	24000000
24140000	こん包供給品	24000000
25100000	自動車	25000000
25110000	海上輸送	25000000
25120000	鉄道および路面鉄道機械および設備	25000000
25130000	航空機	25000000
25150000	宇宙船	25000000
25160000	非動力式二輪車	25000000
25170000	輸送用コンポーネントおよびシステム	25000000
25180000	車両本体およびトレーラー	25000000
25190000	輸送サービス機械設備	25000000
25200000	航空宇宙システム、コンポーネントおよび機械設備	25000000
26100000	動力源	26000000
26110000	バッテリー、発電機および伝動装置	26000000
26120000	電気ワイヤー、ケーブルおよび配管	26000000
26130000	発電	26000000
26140000	原子および核エネルギー機械設備	26000000
27110000	ハンド・ツール	27000000
27120000	油圧式機械設備	27000000
27130000	空気機械および設備	27000000
27140000	自動車特殊工具	27000000
30100000	構造部品および基礎型材	30000000
30110000	コンクリート、セメントおよび石こう	30000000
30120000	道路および景観	30000000
30130000	構造建造製品	30000000
30140000	絶縁材	30000000
30150000	外装材	30000000
30160000	内装仕上げ材	30000000
30170000	ドア、扉、窓およびガラス	30000000
30180000	配管備品	30000000
30190000	建設および保守支援機器	30000000
30240000	簡易構造物建築部材	30000000
30250000	地下採掘構造および資材	30000000
30260000	構造材料	30000000
31100000	鋳物および鋳物アセンブリ	31000000
31110000	押出し品	31000000
31120000	鋳物（機械加工）	31000000
31130000	鍛造品	31000000
31140000	鋳型	31000000
31150000	ロープ、チェーン、ケーブル、ワイヤおよびひも	31000000
31160000	金物類	31000000
31170000	ベアリング、ブッシング、車輪およびギア	31000000
31180000	パッキングランドブーツおよびカバー	31000000
31190000	研磨材、つやだし材および平滑材	31000000
31200000	接着剤およびシーリング材	31000000
31210000	塗料、プライマーおよび仕上剤	31000000
31220000	染色・なめし抽出物	31000000
31230000	ローストック（機械加工）	31000000
31240000	工業用レンズ	31000000
31250000	空気圧、油圧および電気制御システム	31000000
31260000	ハウジング、キャビネットおよびケーシング	31000000
31270000	機械製パーツ	31000000
31280000	プレス加工および薄板コンポーネント	31000000
31290000	押出し品（機械加工）	31000000
31300000	鍛造品（機械加工）	31000000
31310000	組立管アセンブリ	31000000
31320000	組立バーストック・アセンブリ	31000000
31330000	構造アセンブリ	31000000
31340000	組立シート・アセンブリ	31000000
31350000	組立チューブ・アセンブリ	31000000
31360000	組立プレート・アセンブリ	31000000
31370000	耐火材	31000000
31380000	磁石および磁気材料	31000000
31390000	機械加工	31000000
31400000	ガスケット	31000000
31410000	シール（充填材）	31000000
31420000	焼結用部品	31000000
32100000	プリント回路、集積回路およびマイクロ組立部品	32000000
32110000	半導体素子	32000000
32120000	受動部品	32000000
32130000	電子ハードウェア、部品および付属品	32000000
32140000	電子管デバイスおよび付属品	32000000
32150000	自動車制御装置および部品および付属品	32000000
39100000	電球、白熱電球および電球部品	39000000
39110000	照明器具および付属品	39000000
39120000	電気機器、部品および供給品	39000000
39130000	電線管理装置、付属品、用品	39000000
40100000	暖房、換気および空気清浄	40000000
40140000	液体および気体配給	40000000
40150000	工業用ポンプおよび圧縮機	40000000
40160000	工業濾過および精製	40000000
40170000	配管および管取付、導管敷設	40000000
40180000	チューブおよび継手	40000000
41100000	ラボ用および科学用機器	41000000
41110000	測定、監視および試験器具	41000000
41120000	ラボ用供給品およびフィクスチャ	41000000
42120000	獣医科用機器および供給品	42000000
42130000	医療用衣服･繊維用品	42000000
42140000	患者介護･治療関連用品･予備品	42000000
42150000	歯科装備およびその予備品	42000000
42160000	透析装置および供給品	42000000
42170000	救急および現場医療サービス用品	42000000
42180000	患者の検査およびモニタリング用品	42000000
42190000	医療設備用品	42000000
42200000	医療用画像診断および核医学用品	42000000
42210000	身体障害者自立支援用品	42000000
42220000	静脈および動脈管理用品	42000000
42230000	臨床栄養補給	42000000
42240000	整形外科、義肢およびスポーツ医学用品	42000000
42250000	理学療法、作業療法およびリハビリテーション用品	42000000
42260000	検死および死体安置器具および供給品	42000000
42270000	呼吸、麻酔および蘇生用品	42000000
42280000	医療用滅菌用品	42000000
42290000	外科（手術）用品	42000000
42300000	医療実習および教育用供給品	42000000
42310000	創傷治療用品	42000000
42320000	整形外科手術による移植	42000000
43190000	通信装置および付属品	43000000
43200000	情報技術、ブロードキャスティングおよび電気通信の部品	43000000
43210000	コンピュータ機器および付属品	43000000
43220000	データ音声、マルチメディア・ネットワーク機器、プラットフォームおよび付属品	43000000
43230000	ソフトウェア	43000000
44100000	事務機、供給品および付属品	44000000
44110000	オフィスおよびデスク・付属品	44000000
44120000	オフィス用供給品	44000000
45100000	印刷および出版機器	45000000
45110000	オーディオおよびビジュアル・プレゼンテーション、制作機器	45000000
45120000	写真、撮影、ビデオ機器	45000000
45130000	写真および録音媒体	45000000
45140000	写真撮影用供給品	45000000
46100000	軽い武器および弾薬	46000000
46110000	通常戦争用武器	46000000
46120000	ミサイル	46000000
46130000	ロケットおよびサブシステム	46000000
46140000	発射台	46000000
46150000	法執行	46000000
46160000	公衆安全および制御	46000000
46170000	セキュリティ監視用品および検知器	46000000
46180000	個人安全および保護	46000000
46190000	防火	46000000
46200000	防衛、法執行、警備、および安全トレーニング機器	46000000
46210000	作業場安全装置および機器および教材	46000000
47100000	上水および下水処理用供給品および廃水	47000000
47110000	業務用ランドリおよびドライクリーニング機器	47000000
47120000	清掃器具	47000000
47130000	清掃用供給品	47000000
48100000	フードサービス機器	48000000
48110000	自動販売機	48000000
48120000	カジノ用機器	48000000
48130000	葬儀用機器および器具	48000000
49100000	収集品および賞品	49000000
49120000	キャンプおよびアウトドア用品と付属品	49000000
49130000	釣りおよび狩猟用品	49000000
49140000	水上スポーツ用品	49000000
49150000	ウィンタースポーツ用品	49000000
49160000	フィールドおよびコート・スポーツ用具	49000000
49170000	トレーニングジムおよびボクシング用品	49000000
49180000	ターゲットおよびテーブル・ゲーム用品	49000000
49200000	フィットネス用品	49000000
49210000	その他のスポーツ	49000000
49220000	スポーツ用品および付属品	49000000
49240000	リクレーション、遊園地、プールおよびスパ用品と供給品	49000000
50100000	果実、野菜および種実類	50000000
50110000	肉類および家禽製品	50000000
50120000	海産食品	50000000
50130000	酪農品および鳥卵	50000000
50150000	食用油脂	50000000
50160000	チョコレート、糖類、甘味料および菓子製品	50000000
50170000	調味料および保存料	50000000
50180000	パンおよびベーカリー製品	50000000
50190000	調理済み食品および保存食品	50000000
50200000	飲料水	50000000
50210000	タバコ、喫煙用品および代用品	50000000
50220000	穀類および豆類の製品	50000000
50300000	生鮮果実	50000000
50310000	有機新鮮果物	50000000
50320000	乾燥冷凍果実	50000000
50330000	乾燥有機冷凍果実	50000000
50340000	冷凍果実	50000000
50350000	冷凍有機果実	50000000
50360000	缶詰または瓶詰めの冷凍果実	50000000
50370000	缶詰または瓶詰めの有機冷凍果実	50000000
50380000	フルーツピューレ	50000000
50400000	生鮮野菜	50000000
50410000	有機新鮮野菜	50000000
50420000	乾燥冷凍野菜	50000000
50430000	乾燥有機冷凍野菜	50000000
50440000	冷凍野菜	50000000
50450000	冷凍有機野菜	50000000
50460000	缶詰または瓶詰めの冷凍野菜	50000000
50470000	缶詰または瓶詰めの有機冷凍野菜	50000000
51100000	抗感染症薬	51000000
51110000	抗腫瘍薬	51000000
51120000	心疾患薬	51000000
51130000	血液関連薬	51000000
51140000	中枢神経系作用薬	51000000
51150000	自律神経系薬	51000000
51160000	呼吸器に影響する薬	51000000
51170000	胃腸系に影響する薬	51000000
51180000	ホルモン剤およびホルモン拮抗剤	51000000
51190000	水と電解質に影響する薬剤	51000000
51200000	免疫調節薬	51000000
51210000	その他の薬剤類	51000000
51240000	耳、目、鼻および皮膚に影響する薬	51000000
51250000	動物用栄養補助食品	51000000
52100000	床の敷物	52000000
52120000	寝具、テーブルおよび台所用リネン製品およびタオル	52000000
52130000	ウィンドウトリートメント	52000000
52140000	家庭用電化製品	52000000
52150000	家庭用台所用品および台所器具	52000000
52160000	民生電子製品	52000000
52170000	家庭用室内壁用品	52000000
53100000	衣類	53000000
53110000	履き物	53000000
53120000	カバン、ハンドバッグ、リュックおよびケース	53000000
53130000	衛生用品	53000000
53140000	裁縫用供給品と付属品	53000000
54100000	宝飾品	54000000
54110000	時計類	54000000
54120000	宝石原石	54000000
55100000	印刷媒体	55000000
55110000	電子的参考資料	55000000
55120000	表示および付属品	55000000
56100000	宿泊施設家具	56000000
56110000	業務および産業用家具	56000000
56120000	教室、講義および施設用家具および備品	56000000
56130000	マーチャンダイジング家具および付属品	56000000
56140000	家庭用家具装飾品	56000000
60100000	発育および専門指導補助用具、教材、付属品および供給品	60000000
60110000	教室内装飾品および供給品	60000000
60120000	美術および工芸器材、付属品および供給品	60000000
60130000	楽器、パーツおよび付属品	60000000
60140000	おもちゃとゲーム	60000000
70100000	漁業と養殖業	70000000
70110000	園芸	70000000
70120000	畜産サービス	70000000
70130000	土地および土壌整備、管理および保護	70000000
70140000	穀物生産、管理および保護	70000000
70150000	林業	70000000
70160000	野生動物と植物相	70000000
70170000	水資源開発および監視	70000000
71100000	採鉱事業	71000000
71110000	石油・ガス調査サービス	71000000
71120000	坑井掘削建設サービス	71000000
71130000	石油およびガス抽出および生産強化サービス	71000000
71140000	石油およびガス復旧および再生サービス	71000000
71150000	石油およびガスデータ管理と処理サービス	71000000
71160000	石油およびガスガス坑井プロジェクト管理サービス	71000000
72100000	建物および施設の保守と修繕サービス	72000000
72110000	住宅用建物建設サービス	72000000
72120000	非居住用途用建物建設サービス	72000000
72140000	大規模建築物建設サービス	72000000
72150000	特殊工場建設および保守サービス	72000000
73100000	プラスチックおよび化学産業	73000000
73110000	木材および紙産業	73000000
73120000	金属およびミネラル産業	73000000
73130000	食品および飲料産業	73000000
73140000	繊維、テキスタイルおよび織物産業	73000000
73150000	製造サポートサービス	73000000
73160000	機械および輸送機器製造業	73000000
73170000	電気製品および精密機器製造	73000000
73180000	機械加工および加工サービス	73000000
76100000	除染サービス	76000000
76110000	清掃サービス	76000000
76120000	ゴミ廃棄および処理	76000000
76130000	毒性および棄権廃棄物除庫	76000000
77100000	環境マネジメント	77000000
77110000	環境保護	77000000
77120000	汚染追跡監視およびリハビリテーション	77000000
77130000	汚染物質追跡、モニタリングおよびリハビリテーションサービス	77000000
78100000	郵便およびカーゴ輸送	78000000
78110000	乗客輸送	78000000
78120000	マテリアルパッキングおよびハンドリング	78000000
78130000	保管	78000000
78140000	輸送サービス	78000000
78180000	輸送リペア、保守サービス	78000000
80100000	経営アドバイザリーサービス	80000000
80110000	人材サービス	80000000
80120000	法務サービス	80000000
80130000	不動産サービス	80000000
80140000	販売および流通	80000000
80150000	取引方針およびサービス	80000000
80160000	ビジネス運営管理サービス	80000000
80170000	広報およびプロフェッショナル・コミュニケーション・サービス	80000000
81100000	プロフェッショナルエンジニアリングサービス	81000000
81110000	コンピュータサービス	81000000
81120000	経済	81000000
81130000	統計	81000000
81140000	製造技術	81000000
81150000	地球科学関連サービス	81000000
81160000	情報技術サービス提供	81000000
81170000	生物科学サービス	81000000
82100000	広告	82000000
82110000	ライティングおよび翻訳	82000000
82120000	リプロダクションサービス	82000000
82130000	写真関連サービス	82000000
82140000	グラフィックデザイン	82000000
82150000	職業芸術家およびパーフォーマー	82000000
83100000	ユーティリティ	83000000
83110000	電気通信メディアサービス	83000000
83120000	情報サービス	83000000
84100000	開発財務	84000000
84110000	簿記会計サービス	84000000
84120000	バンキングおよび投資	84000000
84130000	保険および年金サービス	84000000
84140000	クレジット会社	84000000
85100000	総合ヘルスサービス	85000000
85110000	病気の防止と管理	85000000
85120000	医療行為	85000000
85130000	医学研究および実験	85000000
85140000	代替医療およびホリッティック医学	85000000
85150000	食物および栄養学関連サービス	85000000
85160000	医療用手術用器具保全修復サービス	85000000
85170000	死者および瀕死者支援サービス	85000000
86100000	職業訓練	86000000
86110000	その他の教育システム	86000000
86120000	教育機関	86000000
86130000	特化教育サービス	86000000
86140000	教育施設	86000000
90100000	レストランおよびケータリング	90000000
90110000	ホテル、宿泊および会議施設	90000000
90120000	旅行の円滑化	90000000
90130000	パフォーミングアート	90000000
90140000	商業スポーツ	90000000
90150000	娯楽サービス	90000000
91100000	個人行動	91000000
91110000	家庭および個人の生活便宜	91000000
92100000	治安および保安	92000000
92110000	軍サービスおよび国防	92000000
92120000	警備と個人の安全	92000000
93100000	政治システムおよび機関	93000000
93110000	社会政治的情勢	93000000
93120000	国際関係	93000000
93130000	人道援助および救援	93000000
93140000	地域および社会活動	93000000
93150000	行政および財政業務	93000000
93160000	課税	93000000
93170000	商取引政策および規制	93000000
94100000	業務関連組織	94000000
94110000	宗教組織	94000000
94120000	クラブ	94000000
94130000	市民組織、援助、および運動	94000000
95100000	筆地	95000000
95110000	道路	95000000
95120000	常設建築物および構造体	95000000
95130000	簡易建築物および構造体	95000000
95140000	プレハブ建築物および構造体	95000000
\.


--
-- Data for Name: item_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_information (item_category_id, item_id, item_name, update_date, update_year, company_id, original_item_name) FROM stdin;
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	9853454080	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	9853454080	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	9854633030	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	9857717310	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2009887200	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2009887200	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	5800884510	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	9857141090	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2014351060	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2405326010	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	9856103290	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	9856103290	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	5800160590	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	5800160590	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2007595490	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2007595490	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	1300734030	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	1301461250	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	6400058680	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	6600509220	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	8703147070	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2301641350	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2301641350	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2300921250	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2300921250	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	9854633030	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	9857717310	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2002199850	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2503930820	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2503930820	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	9856214110	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	9856214110	xxx
43220000	43223100	デジタル移動網インフラストラクチャ機器および部品	2023-03-06 17:58:00	2023	2004445400	xxx
43220000	43223300	データ通信およびネットワーク接続設置機器および装置	2023-03-06 17:58:00	2023	2004445400	xxx
\.


--
-- Data for Name: transaction_information; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_information (buyer_company_id, vendor_company_id, item_id, proposed_price, actual_price, order_quantity, update_date, update_year, original_item_name) FROM stdin;
9857113030	2004445400	43223100	2000	1500	100	2022-10-06 17:58:00	2022	xxx
9857113030	2004445400	43223100	2100	1800	120	2022-11-06 17:58:00	2022	xxx
9857113030	2004445400	43223100	2200	1700	130	2022-12-06 17:58:00	2022	xxx
9857113030	2004445400	43223100	2700	1600	120	2023-01-06 17:58:00	2023	xxx
9857113030	2004445400	43223100	1900	1300	250	2023-02-06 17:58:00	2023	xxx
9857113030	2004445400	43223100	1800	2300	70	2023-03-06 17:58:00	2023	xxx
9857113030	2004445400	43223300	2000	1417	108	2022-10-06 17:58:00	2022	xxx
9857113030	2004445400	43223300	2100	1773	112	2022-11-06 17:58:00	2022	xxx
9857113030	2004445400	43223300	2200	1642	136	2022-12-06 17:58:00	2022	xxx
9857113030	2004445400	43223300	2700	1687	125	2023-01-06 17:58:00	2023	xxx
9857113030	2004445400	43223300	1900	1332	241	2023-02-06 17:58:00	2023	xxx
9857113030	2004445400	43223300	1800	2205	65	2023-03-06 17:58:00	2023	xxx
9857113030	9853454080	43223100	0	1412	93	2022-10-06 17:58:00	2022	xxx
9857113030	9853454080	43223100	0	1828	130	2022-11-06 17:58:00	2022	xxx
9857113030	9853454080	43223100	0	1671	125	2022-12-06 17:58:00	2022	xxx
9857113030	9853454080	43223100	0	1528	123	2023-01-06 17:58:00	2023	xxx
9857113030	9853454080	43223100	0	1288	250	2023-02-06 17:58:00	2023	xxx
9857113030	9853454080	43223100	0	2389	69	2023-03-06 17:58:00	2023	xxx
9857113030	9853454080	43223300	0	1521	95	2022-10-06 17:58:00	2022	xxx
9857113030	9853454080	43223300	0	1740	130	2022-11-06 17:58:00	2022	xxx
9857113030	9853454080	43223300	0	1692	127	2022-12-06 17:58:00	2022	xxx
9857113030	9853454080	43223300	0	1668	112	2023-01-06 17:58:00	2023	xxx
9857113030	9853454080	43223300	0	1276	255	2023-02-06 17:58:00	2023	xxx
9857113030	9853454080	43223300	0	2212	78	2023-03-06 17:58:00	2023	xxx
9857113030	9854633030	43223300	0	1432	102	2022-10-06 17:58:00	2022	xxx
9857113030	9854633030	43223300	0	1801	125	2022-11-06 17:58:00	2022	xxx
9857113030	9854633030	43223300	0	1762	131	2022-12-06 17:58:00	2022	xxx
9857113030	9854633030	43223300	0	1656	120	2023-01-06 17:58:00	2023	xxx
9857113030	9854633030	43223300	0	1367	255	2023-02-06 17:58:00	2023	xxx
9857113030	9854633030	43223300	0	2385	69	2023-03-06 17:58:00	2023	xxx
9857113030	9857717310	43223100	0	1469	108	2022-10-06 17:58:00	2022	xxx
9857113030	9857717310	43223100	0	1808	122	2022-11-06 17:58:00	2022	xxx
9857113030	9857717310	43223100	0	1716	135	2022-12-06 17:58:00	2022	xxx
9857113030	9857717310	43223100	0	1580	127	2023-01-06 17:58:00	2023	xxx
9857113030	9857717310	43223100	0	1241	260	2023-02-06 17:58:00	2023	xxx
9857113030	9857717310	43223100	0	2390	73	2023-03-06 17:58:00	2023	xxx
9857113030	2009887200	43223100	0	1554	96	2022-10-06 17:58:00	2022	xxx
9857113030	2009887200	43223100	0	1888	128	2022-11-06 17:58:00	2022	xxx
9857113030	2009887200	43223100	0	1656	121	2022-12-06 17:58:00	2022	xxx
9857113030	2009887200	43223100	0	1560	119	2023-01-06 17:58:00	2023	xxx
9857113030	2009887200	43223100	0	1400	257	2023-02-06 17:58:00	2023	xxx
9857113030	2009887200	43223100	0	2376	73	2023-03-06 17:58:00	2023	xxx
9857113030	2009887200	43223300	0	1561	90	2022-10-06 17:58:00	2022	xxx
9857113030	2009887200	43223300	0	1877	130	2022-11-06 17:58:00	2022	xxx
9857113030	2009887200	43223300	0	1616	132	2022-12-06 17:58:00	2022	xxx
9857113030	2009887200	43223300	0	1641	127	2023-01-06 17:58:00	2023	xxx
9857113030	2009887200	43223300	0	1296	245	2023-02-06 17:58:00	2023	xxx
9857113030	2009887200	43223300	0	2254	63	2023-03-06 17:58:00	2023	xxx
9857113030	5800884510	43223300	0	1533	103	2022-10-06 17:58:00	2022	xxx
9857113030	5800884510	43223300	0	1725	112	2022-11-06 17:58:00	2022	xxx
9857113030	5800884510	43223300	0	1699	126	2022-12-06 17:58:00	2022	xxx
9857113030	5800884510	43223300	0	1571	111	2023-01-06 17:58:00	2023	xxx
9857113030	5800884510	43223300	0	1313	256	2023-02-06 17:58:00	2023	xxx
9857113030	5800884510	43223300	0	2249	67	2023-03-06 17:58:00	2023	xxx
9857113030	2014351060	43223100	0	1592	108	2022-10-06 17:58:00	2022	xxx
9857113030	2014351060	43223100	0	1777	122	2022-11-06 17:58:00	2022	xxx
9857113030	2014351060	43223100	0	1643	128	2022-12-06 17:58:00	2022	xxx
9857113030	2014351060	43223100	0	1673	123	2023-01-06 17:58:00	2023	xxx
9857113030	2014351060	43223100	0	1272	244	2023-02-06 17:58:00	2023	xxx
9857113030	2014351060	43223100	0	2263	62	2023-03-06 17:58:00	2023	xxx
9857113030	9856103290	43223100	0	1594	92	2022-10-06 17:58:00	2022	xxx
9857113030	9856103290	43223100	0	1830	117	2022-11-06 17:58:00	2022	xxx
9857113030	9856103290	43223100	0	1799	138	2022-12-06 17:58:00	2022	xxx
9857113030	9857141090	43223100	0	1740	132	2022-12-06 17:58:00	2022	xxx
9857113030	9857141090	43223100	0	1697	121	2023-01-06 17:58:00	2023	xxx
9857113030	9857141090	43223100	0	1282	249	2023-02-06 17:58:00	2023	xxx
9857113030	9857141090	43223100	0	2206	66	2023-03-06 17:58:00	2023	xxx
9857113030	2405326010	43223100	0	1672	128	2023-01-06 17:58:00	2023	xxx
9857113030	9857141090	43223100	0	1714	120	2022-11-06 17:58:00	2022	xxx
9857113030	2405326010	43223100	0	1339	254	2023-02-06 17:58:00	2023	xxx
9857113030	2405326010	43223100	0	2242	63	2023-03-06 17:58:00	2023	xxx
9857113030	2405326010	43223100	0	1790	123	2022-12-06 17:58:00	2022	xxx
9857113030	2405326010	43223100	0	1740	121	2022-11-06 17:58:00	2022	xxx
9857113030	2405326010	43223100	0	1505	105	2022-10-06 17:58:00	2022	xxx
9857113030	9856103290	43223100	0	1575	125	2023-01-06 17:58:00	2023	xxx
9857113030	9856103290	43223100	0	1275	250	2023-02-06 17:58:00	2023	xxx
9857113030	9856103290	43223100	0	2354	60	2023-03-06 17:58:00	2023	xxx
9857113030	9856103290	43223300	0	1451	106	2022-10-06 17:58:00	2022	xxx
9857113030	9856103290	43223300	0	1824	124	2022-11-06 17:58:00	2022	xxx
9857113030	9856103290	43223300	0	1631	125	2022-12-06 17:58:00	2022	xxx
9857113030	9856103290	43223300	0	1598	118	2023-01-06 17:58:00	2023	xxx
9857113030	9856103290	43223300	0	1303	256	2023-02-06 17:58:00	2023	xxx
9857113030	9856103290	43223300	0	2311	78	2023-03-06 17:58:00	2023	xxx
9857113030	5800160590	43223100	0	1534	97	2022-10-06 17:58:00	2022	xxx
9857113030	5800160590	43223100	0	1771	125	2022-11-06 17:58:00	2022	xxx
9857113030	5800160590	43223100	0	1691	136	2022-12-06 17:58:00	2022	xxx
9857113030	5800160590	43223100	0	1584	128	2023-01-06 17:58:00	2023	xxx
9857113030	5800160590	43223100	0	1233	245	2023-02-06 17:58:00	2023	xxx
9857113030	5800160590	43223100	0	2359	66	2023-03-06 17:58:00	2023	xxx
9857113030	5800160590	43223300	0	1531	109	2022-10-06 17:58:00	2022	xxx
9857113030	5800160590	43223300	0	1727	130	2022-11-06 17:58:00	2022	xxx
9857113030	5800160590	43223300	0	1632	121	2022-12-06 17:58:00	2022	xxx
9857113030	5800160590	43223300	0	1662	117	2023-01-06 17:58:00	2023	xxx
9857113030	5800160590	43223300	0	1222	257	2023-02-06 17:58:00	2023	xxx
9857113030	5800160590	43223300	0	2312	72	2023-03-06 17:58:00	2023	xxx
9857113030	2007595490	43223100	0	1422	97	2022-10-06 17:58:00	2022	xxx
9857113030	2007595490	43223100	0	1742	128	2022-11-06 17:58:00	2022	xxx
9857113030	2007595490	43223100	0	1702	130	2022-12-06 17:58:00	2022	xxx
9857113030	2007595490	43223100	0	1598	110	2023-01-06 17:58:00	2023	xxx
9857113030	2007595490	43223100	0	1333	258	2023-02-06 17:58:00	2023	xxx
9857113030	2007595490	43223100	0	2254	75	2023-03-06 17:58:00	2023	xxx
9857113030	2007595490	43223300	0	1470	90	2022-10-06 17:58:00	2022	xxx
9857113030	2007595490	43223300	0	1703	124	2022-11-06 17:58:00	2022	xxx
9857113030	2007595490	43223300	0	1733	139	2022-12-06 17:58:00	2022	xxx
9857113030	2007595490	43223300	0	1641	111	2023-01-06 17:58:00	2023	xxx
9857113030	2007595490	43223300	0	1373	260	2023-02-06 17:58:00	2023	xxx
9857113030	2007595490	43223300	0	2384	64	2023-03-06 17:58:00	2023	xxx
9857113030	1300734030	43223300	0	1505	107	2022-10-06 17:58:00	2022	xxx
9857113030	1300734030	43223300	0	1864	127	2022-11-06 17:58:00	2022	xxx
9857113030	1300734030	43223300	0	1800	134	2022-12-06 17:58:00	2022	xxx
9857113030	1300734030	43223300	0	1689	127	2023-01-06 17:58:00	2023	xxx
9857113030	1300734030	43223300	0	1360	245	2023-02-06 17:58:00	2023	xxx
9857113030	1300734030	43223300	0	2215	62	2023-03-06 17:58:00	2023	xxx
9857113030	1301461250	43223300	0	1541	98	2022-10-06 17:58:00	2022	xxx
9857113030	1301461250	43223300	0	1849	117	2022-11-06 17:58:00	2022	xxx
9857113030	1301461250	43223300	0	1616	128	2022-12-06 17:58:00	2022	xxx
9857113030	1301461250	43223300	0	1631	113	2023-01-06 17:58:00	2023	xxx
9857113030	1301461250	43223300	0	1339	251	2023-02-06 17:58:00	2023	xxx
9857113030	1301461250	43223300	0	2204	71	2023-03-06 17:58:00	2023	xxx
9857113030	6400058680	43223300	0	1574	108	2022-10-06 17:58:00	2022	xxx
9857113030	6400058680	43223300	0	1866	113	2022-11-06 17:58:00	2022	xxx
9857113030	6400058680	43223300	0	1759	130	2022-12-06 17:58:00	2022	xxx
9857113030	6400058680	43223300	0	1520	127	2023-01-06 17:58:00	2023	xxx
9857113030	6400058680	43223300	0	1377	243	2023-02-06 17:58:00	2023	xxx
9857113030	6400058680	43223300	0	2256	62	2023-03-06 17:58:00	2023	xxx
9857113030	6600509220	43223300	0	1492	91	2022-10-06 17:58:00	2022	xxx
9857113030	6600509220	43223300	0	1838	130	2022-11-06 17:58:00	2022	xxx
9857113030	6600509220	43223300	0	1678	124	2022-12-06 17:58:00	2022	xxx
9857113030	6600509220	43223300	0	1567	130	2023-01-06 17:58:00	2023	xxx
9857113030	6600509220	43223300	0	1308	241	2023-02-06 17:58:00	2023	xxx
9857113030	6600509220	43223300	0	2227	66	2023-03-06 17:58:00	2023	xxx
9857113030	8703147070	43223300	0	1599	98	2022-10-06 17:58:00	2022	xxx
9857113030	8703147070	43223300	0	1725	119	2022-11-06 17:58:00	2022	xxx
9857113030	8703147070	43223300	0	1611	127	2022-12-06 17:58:00	2022	xxx
9857113030	8703147070	43223300	0	1638	118	2023-01-06 17:58:00	2023	xxx
9857113030	8703147070	43223300	0	1267	251	2023-02-06 17:58:00	2023	xxx
9857113030	8703147070	43223300	0	2383	67	2023-03-06 17:58:00	2023	xxx
9857113030	2301641350	43223100	0	1515	97	2022-10-06 17:58:00	2022	xxx
9857113030	2301641350	43223100	0	1748	130	2022-11-06 17:58:00	2022	xxx
9857113030	2301641350	43223100	0	1750	137	2022-12-06 17:58:00	2022	xxx
9857113030	2301641350	43223100	0	1585	130	2023-01-06 17:58:00	2023	xxx
9857113030	2301641350	43223100	0	1210	250	2023-02-06 17:58:00	2023	xxx
9857113030	2301641350	43223100	0	2241	65	2023-03-06 17:58:00	2023	xxx
9857113030	2301641350	43223300	0	1577	106	2022-10-06 17:58:00	2022	xxx
9857113030	2301641350	43223300	0	1736	130	2022-11-06 17:58:00	2022	xxx
9857113030	2301641350	43223300	0	1730	136	2022-12-06 17:58:00	2022	xxx
9857113030	2301641350	43223300	0	1679	125	2023-01-06 17:58:00	2023	xxx
9857113030	2301641350	43223300	0	1326	240	2023-02-06 17:58:00	2023	xxx
9857113030	2301641350	43223300	0	2367	69	2023-03-06 17:58:00	2023	xxx
9857113030	2300921250	43223100	0	1517	107	2022-10-06 17:58:00	2022	xxx
9857113030	2300921250	43223100	0	1805	114	2022-11-06 17:58:00	2022	xxx
9857113030	2300921250	43223100	0	1705	126	2022-12-06 17:58:00	2022	xxx
9857113030	2300921250	43223100	0	1579	115	2023-01-06 17:58:00	2023	xxx
9857113030	2300921250	43223100	0	1383	244	2023-02-06 17:58:00	2023	xxx
9857113030	2300921250	43223100	0	2219	77	2023-03-06 17:58:00	2023	xxx
9857113030	2300921250	43223300	0	1533	92	2022-10-06 17:58:00	2022	xxx
9857113030	2300921250	43223300	0	1737	130	2022-11-06 17:58:00	2022	xxx
9857113030	2300921250	43223300	0	1704	121	2022-12-06 17:58:00	2022	xxx
9857113030	2300921250	43223300	0	1505	116	2023-01-06 17:58:00	2023	xxx
9857113030	2300921250	43223300	0	1267	259	2023-02-06 17:58:00	2023	xxx
9857113030	2300921250	43223300	0	2203	76	2023-03-06 17:58:00	2023	xxx
9857113030	9854633030	43223100	0	1536	97	2022-10-06 17:58:00	2022	xxx
9857113030	9854633030	43223100	0	1708	112	2022-11-06 17:58:00	2022	xxx
9857113030	9854633030	43223100	0	1796	137	2022-12-06 17:58:00	2022	xxx
9857113030	9854633030	43223100	0	1628	119	2023-01-06 17:58:00	2023	xxx
9857113030	9854633030	43223100	0	1345	255	2023-02-06 17:58:00	2023	xxx
9857113030	9854633030	43223100	0	2302	79	2023-03-06 17:58:00	2023	xxx
9857113030	9857717310	43223300	0	1485	105	2022-10-06 17:58:00	2022	xxx
9857113030	9857717310	43223300	0	1748	114	2022-11-06 17:58:00	2022	xxx
9857113030	9857717310	43223300	0	1782	121	2022-12-06 17:58:00	2022	xxx
9857113030	9857717310	43223300	0	1559	115	2023-01-06 17:58:00	2023	xxx
9857113030	9857717310	43223300	0	1394	258	2023-02-06 17:58:00	2023	xxx
9857113030	9857717310	43223300	0	2386	60	2023-03-06 17:58:00	2023	xxx
9857113030	2002199850	43223300	0	1574	97	2022-10-06 17:58:00	2022	xxx
9857113030	2002199850	43223300	0	1823	126	2022-11-06 17:58:00	2022	xxx
9857113030	2002199850	43223300	0	1658	120	2022-12-06 17:58:00	2022	xxx
9857113030	2002199850	43223300	0	1619	112	2023-01-06 17:58:00	2023	xxx
9857113030	2002199850	43223300	0	1266	245	2023-02-06 17:58:00	2023	xxx
9857113030	2002199850	43223300	0	2301	71	2023-03-06 17:58:00	2023	xxx
9857113030	2503930820	43223100	0	1586	109	2022-10-06 17:58:00	2022	xxx
9857113030	2503930820	43223100	0	1711	126	2022-11-06 17:58:00	2022	xxx
9857113030	2503930820	43223100	0	1735	129	2022-12-06 17:58:00	2022	xxx
9857113030	2503930820	43223100	0	1535	123	2023-01-06 17:58:00	2023	xxx
9857113030	2503930820	43223100	0	1364	247	2023-02-06 17:58:00	2023	xxx
9857113030	2503930820	43223100	0	2262	63	2023-03-06 17:58:00	2023	xxx
9857113030	2503930820	43223300	0	1421	97	2022-10-06 17:58:00	2022	xxx
9857113030	2503930820	43223300	0	1849	118	2022-11-06 17:58:00	2022	xxx
9857113030	2503930820	43223300	0	1712	132	2022-12-06 17:58:00	2022	xxx
9857113030	2503930820	43223300	0	1551	129	2023-01-06 17:58:00	2023	xxx
9857113030	2503930820	43223300	0	1332	241	2023-02-06 17:58:00	2023	xxx
9857113030	2503930820	43223300	0	2316	71	2023-03-06 17:58:00	2023	xxx
9857113030	9856214110	43223100	0	1536	107	2022-10-06 17:58:00	2022	xxx
9857113030	9856214110	43223100	0	1894	121	2022-11-06 17:58:00	2022	xxx
9857113030	9856214110	43223100	0	1620	124	2022-12-06 17:58:00	2022	xxx
9857113030	9856214110	43223100	0	1678	116	2023-01-06 17:58:00	2023	xxx
9857113030	9856214110	43223100	0	1399	242	2023-02-06 17:58:00	2023	xxx
9857113030	9856214110	43223100	0	2368	64	2023-03-06 17:58:00	2023	xxx
9857113030	9856214110	43223300	0	1437	107	2022-10-06 17:58:00	2022	xxx
9857113030	9856214110	43223300	0	1840	129	2022-11-06 17:58:00	2022	xxx
9857113030	9856214110	43223300	0	1736	125	2022-12-06 17:58:00	2022	xxx
9857113030	9856214110	43223300	0	1509	120	2023-01-06 17:58:00	2023	xxx
9857113030	9856214110	43223300	0	1319	258	2023-02-06 17:58:00	2023	xxx
9857113030	9856214110	43223300	0	2359	74	2023-03-06 17:58:00	2023	xxx
9857113030	9857141090	43223100	0	1453	91	2022-10-06 17:58:00	2022	xxx
\.


--
-- Data for Name: user_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_master (user_id, login_id, password) FROM stdin;
user1	login1	password1
\.


--
-- Data for Name: weight_master; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.weight_master (user_id, quality_weight, cost_weight, delivery_weight, finance_weight, environment_weight, labor_weight, ethics_weight, sustainable_weight, update_date) FROM stdin;
user1	0.8	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-06 10:19:00
user1	0.8	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-10 13:58:59.437
user1	0.8	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-10 13:59:12.486
user1	1	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-10 13:59:27.561
user1	1	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-10 14:00:28.913
user1	0.77	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-10 14:00:51.484
user1	1.27	0.8	0.8	0.8	0.8	0.8	0.8	0.8	2023-03-10 14:01:25.882
user1	1.25	1	1	1.25	0.8	0.8	0.8	0.8	2023-03-10 14:04:11.042
user1	1	1	1	1.25	0.75	0.75	1.25	0.75	2023-03-10 14:06:12.431
user1	1.25	1.2	1	1.25	0.75	0.75	1.25	0.75	2023-03-10 14:06:37.855
user1	1.25	1.25	1	1.25	0.75	0.75	1.25	0.75	2023-03-10 14:07:38.462
user1	1	1.25	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:09:22.025
user1	1	0.8	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:14:27.711
user1	1	0.8	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:15:28.068
user1	1.25	0.8	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:15:35.889
user1	1.25	0.8	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:16:46.279
user1	1.25	0.8	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:17:36.331
user1	0.75	1.05	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:24:18.155
user1	1.11	0.75	1	0.75	0.75	0.75	1.25	0.75	2023-03-10 14:43:47.516
user1	0.95	0.75	1	0.75	0.75	1	1	0.75	2023-03-10 14:59:27.665
user1	0.75	1.25	1.25	0.75	0.75	0.95	0.9	0.75	2023-03-10 15:36:37.14
user1	1.1	1.25	1.25	0.75	0.75	0.95	0.9	0.75	2023-03-10 15:43:00.914
user1	1.1	1.25	1.25	0.75	0.75	0.95	0.9	0.75	2023-03-10 18:38:30.323
user1	1.25	1.25	1.25	0.75	0.75	0.95	0.9	0.75	2023-03-10 18:39:00.837
user1	1.25	1.25	1.25	0.75	0.75	0.95	0.9	0.75	2023-03-10 18:39:17.98
user1	0.75	1.25	1.25	0.75	0.75	0.95	0.9	0.75	2023-03-12 10:29:30.454
\.


--
-- Name: evaluation_detail_item_category_group PK_02e9fba80b1df46b5cc31be6d39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluation_detail_item_category_group
    ADD CONSTRAINT "PK_02e9fba80b1df46b5cc31be6d39" PRIMARY KEY (company_id, parameter, update_date);


--
-- Name: item_category_information PK_1033abaf8cef7e7ba758804ed91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_category_information
    ADD CONSTRAINT "PK_1033abaf8cef7e7ba758804ed91" PRIMARY KEY (item_category_id);


--
-- Name: evaluation_detail_item_category PK_18d9cb06cfa1debc925943b8d83; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluation_detail_item_category
    ADD CONSTRAINT "PK_18d9cb06cfa1debc925943b8d83" PRIMARY KEY (company_id, item_category_id, parameter, update_date);


--
-- Name: evaluation_result_item_category_group PK_1b6a4b5d30f274322e3fe6a9b5a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluation_result_item_category_group
    ADD CONSTRAINT "PK_1b6a4b5d30f274322e3fe6a9b5a" PRIMARY KEY (company_id, update_date);


--
-- Name: evaluation_result_item PK_4cd66752e0729485a66f059e9b9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluation_result_item
    ADD CONSTRAINT "PK_4cd66752e0729485a66f059e9b9" PRIMARY KEY (company_id, item_category_id, item_category_group_id, item_id, update_date);


--
-- Name: evaluation_result_item_category PK_50ad37629ce1388131a24dbcad7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluation_result_item_category
    ADD CONSTRAINT "PK_50ad37629ce1388131a24dbcad7" PRIMARY KEY (company_id, item_category_id, update_date);


--
-- Name: evaluation_detail_item PK_78ee561b8673d6e9701e52a8af6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluation_detail_item
    ADD CONSTRAINT "PK_78ee561b8673d6e9701e52a8af6" PRIMARY KEY (company_id, item_category_id, item_id, parameter, update_date);


--
-- Name: company_information PK_7f38f703898cb13d97934bb3299; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_information
    ADD CONSTRAINT "PK_7f38f703898cb13d97934bb3299" PRIMARY KEY (company_id, business_type_id);


--
-- Name: item_information PK_9f30065d95276a2cf14cc016db2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_information
    ADD CONSTRAINT "PK_9f30065d95276a2cf14cc016db2" PRIMARY KEY (item_id, update_date, company_id);


--
-- Name: transaction_information PK_a9cd6f0d70dd84378eb0ac38a9c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_information
    ADD CONSTRAINT "PK_a9cd6f0d70dd84378eb0ac38a9c" PRIMARY KEY (buyer_company_id, vendor_company_id, item_id, update_date);


--
-- Name: business_type_infomation PK_b0072878de92cb04b7390569d64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_type_infomation
    ADD CONSTRAINT "PK_b0072878de92cb04b7390569d64" PRIMARY KEY (business_type_id);


--
-- Name: weight_master PK_b887187732cb83a61ebb339b1cc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weight_master
    ADD CONSTRAINT "PK_b887187732cb83a61ebb339b1cc" PRIMARY KEY (user_id, update_date);


--
-- Name: item_category_group_information PK_dae868f77a55371fa5a92577484; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_category_group_information
    ADD CONSTRAINT "PK_dae868f77a55371fa5a92577484" PRIMARY KEY (item_category_group_id);


--
-- Name: user_master PK_dc2fd281084013caf643e90092c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_master
    ADD CONSTRAINT "PK_dc2fd281084013caf643e90092c" PRIMARY KEY (user_id);


--
-- Name: item_information FK_0cb6428ae300677026f530b5032; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_information
    ADD CONSTRAINT "FK_0cb6428ae300677026f530b5032" FOREIGN KEY (item_category_id) REFERENCES public.item_category_information(item_category_id);


--
-- Name: weight_master FK_a8508a141460e0d3be0ef69faa3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.weight_master
    ADD CONSTRAINT "FK_a8508a141460e0d3be0ef69faa3" FOREIGN KEY (user_id) REFERENCES public.user_master(user_id);


--
-- PostgreSQL database dump complete
--

