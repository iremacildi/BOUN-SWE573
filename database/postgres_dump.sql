--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: event; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.event (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    pictureurl character varying NOT NULL,
    location character varying NOT NULL,
    startdate timestamp without time zone NOT NULL,
    duration smallint,
    capacity smallint NOT NULL,
    organizeruserid integer NOT NULL,
    isactive boolean NOT NULL
);


ALTER TABLE public.event OWNER TO newuser;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO newuser;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- Name: event_organizeruserid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.event_organizeruserid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_organizeruserid_seq OWNER TO newuser;

--
-- Name: event_organizeruserid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.event_organizeruserid_seq OWNED BY public.event.organizeruserid;


--
-- Name: eventattendance; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.eventattendance (
    id integer NOT NULL,
    eventid integer NOT NULL,
    userid integer NOT NULL,
    isactive boolean NOT NULL
);


ALTER TABLE public.eventattendance OWNER TO newuser;

--
-- Name: eventattendance_eventid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.eventattendance_eventid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eventattendance_eventid_seq OWNER TO newuser;

--
-- Name: eventattendance_eventid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.eventattendance_eventid_seq OWNED BY public.eventattendance.eventid;


--
-- Name: eventattendance_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.eventattendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eventattendance_id_seq OWNER TO newuser;

--
-- Name: eventattendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.eventattendance_id_seq OWNED BY public.eventattendance.id;


--
-- Name: eventattendance_userid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.eventattendance_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.eventattendance_userid_seq OWNER TO newuser;

--
-- Name: eventattendance_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.eventattendance_userid_seq OWNED BY public.eventattendance.userid;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    serviceid integer NOT NULL,
    comment character varying NOT NULL,
    rate integer NOT NULL,
    userid integer NOT NULL,
    provideruserid integer NOT NULL,
    isdeleted boolean NOT NULL,
    isgivenbyprovider boolean NOT NULL
);


ALTER TABLE public.feedback OWNER TO newuser;

--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_id_seq OWNER TO newuser;

--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- Name: feedback_provideruserid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.feedback_provideruserid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_provideruserid_seq OWNER TO newuser;

--
-- Name: feedback_provideruserid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.feedback_provideruserid_seq OWNED BY public.feedback.provideruserid;


--
-- Name: feedback_serviceid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.feedback_serviceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_serviceid_seq OWNER TO newuser;

--
-- Name: feedback_serviceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.feedback_serviceid_seq OWNED BY public.feedback.serviceid;


--
-- Name: feedback_userid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.feedback_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_userid_seq OWNER TO newuser;

--
-- Name: feedback_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.feedback_userid_seq OWNED BY public.feedback.userid;


--
-- Name: servicerequest; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.servicerequest (
    id integer NOT NULL,
    serviceid integer NOT NULL,
    userid integer NOT NULL,
    isapproved boolean NOT NULL,
    isanswered boolean NOT NULL,
    isactive boolean NOT NULL,
    providerid integer NOT NULL,
    iscompleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.servicerequest OWNER TO newuser;

--
-- Name: offer_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offer_id_seq OWNER TO newuser;

--
-- Name: offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.offer_id_seq OWNED BY public.servicerequest.id;


--
-- Name: offer_serviceid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.offer_serviceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offer_serviceid_seq OWNER TO newuser;

--
-- Name: offer_serviceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.offer_serviceid_seq OWNED BY public.servicerequest.serviceid;


--
-- Name: offer_userid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.offer_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offer_userid_seq OWNER TO newuser;

--
-- Name: offer_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.offer_userid_seq OWNED BY public.servicerequest.userid;


--
-- Name: service; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.service (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    pictureurl character varying NOT NULL,
    location character varying NOT NULL,
    startdate timestamp without time zone NOT NULL,
    duration smallint,
    capacity smallint NOT NULL,
    provideruserid integer NOT NULL,
    isactive boolean NOT NULL,
    iscompleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.service OWNER TO newuser;

--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.service_id_seq OWNER TO newuser;

--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.service.id;


--
-- Name: service_provideruserid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.service_provideruserid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.service_provideruserid_seq OWNER TO newuser;

--
-- Name: service_provideruserid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.service_provideruserid_seq OWNED BY public.service.provideruserid;


--
-- Name: serviceattendance; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.serviceattendance (
    id integer NOT NULL,
    serviceid integer NOT NULL,
    userid integer NOT NULL,
    isattended boolean DEFAULT false NOT NULL,
    isactive boolean DEFAULT true NOT NULL,
    isattendeecompleted boolean DEFAULT false NOT NULL,
    isprovidercompleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.serviceattendance OWNER TO newuser;

--
-- Name: serviceattendance_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.serviceattendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.serviceattendance_id_seq OWNER TO newuser;

--
-- Name: serviceattendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.serviceattendance_id_seq OWNED BY public.serviceattendance.id;


--
-- Name: serviceattendance_serviceid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.serviceattendance_serviceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.serviceattendance_serviceid_seq OWNER TO newuser;

--
-- Name: serviceattendance_serviceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.serviceattendance_serviceid_seq OWNED BY public.serviceattendance.serviceid;


--
-- Name: serviceattendance_userid_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.serviceattendance_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.serviceattendance_userid_seq OWNER TO newuser;

--
-- Name: serviceattendance_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.serviceattendance_userid_seq OWNED BY public.serviceattendance.userid;


--
-- Name: setting; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public.setting (
    id integer NOT NULL,
    key character varying NOT NULL,
    value character varying NOT NULL,
    isactive bit(1) NOT NULL
);


ALTER TABLE public.setting OWNER TO newuser;

--
-- Name: setting_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.setting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.setting_id_seq OWNER TO newuser;

--
-- Name: setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.setting_id_seq OWNED BY public.setting.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: newuser
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    phonenumber character varying NOT NULL,
    profilepictureurl character varying,
    timecredit smallint NOT NULL,
    isactive boolean NOT NULL,
    hashedpassword character varying NOT NULL,
    timecreditonhold smallint DEFAULT 0 NOT NULL,
    about character varying
);


ALTER TABLE public."user" OWNER TO newuser;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: newuser
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO newuser;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: newuser
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: event id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- Name: event organizeruserid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.event ALTER COLUMN organizeruserid SET DEFAULT nextval('public.event_organizeruserid_seq'::regclass);


--
-- Name: eventattendance id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.eventattendance ALTER COLUMN id SET DEFAULT nextval('public.eventattendance_id_seq'::regclass);


--
-- Name: eventattendance eventid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.eventattendance ALTER COLUMN eventid SET DEFAULT nextval('public.eventattendance_eventid_seq'::regclass);


--
-- Name: eventattendance userid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.eventattendance ALTER COLUMN userid SET DEFAULT nextval('public.eventattendance_userid_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- Name: feedback serviceid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.feedback ALTER COLUMN serviceid SET DEFAULT nextval('public.feedback_serviceid_seq'::regclass);


--
-- Name: feedback userid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.feedback ALTER COLUMN userid SET DEFAULT nextval('public.feedback_userid_seq'::regclass);


--
-- Name: feedback provideruserid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.feedback ALTER COLUMN provideruserid SET DEFAULT nextval('public.feedback_provideruserid_seq'::regclass);


--
-- Name: service id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.service ALTER COLUMN id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- Name: service provideruserid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.service ALTER COLUMN provideruserid SET DEFAULT nextval('public.service_provideruserid_seq'::regclass);


--
-- Name: serviceattendance id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.serviceattendance ALTER COLUMN id SET DEFAULT nextval('public.serviceattendance_id_seq'::regclass);


--
-- Name: serviceattendance serviceid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.serviceattendance ALTER COLUMN serviceid SET DEFAULT nextval('public.serviceattendance_serviceid_seq'::regclass);


--
-- Name: serviceattendance userid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.serviceattendance ALTER COLUMN userid SET DEFAULT nextval('public.serviceattendance_userid_seq'::regclass);


--
-- Name: servicerequest id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.servicerequest ALTER COLUMN id SET DEFAULT nextval('public.offer_id_seq'::regclass);


--
-- Name: servicerequest serviceid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.servicerequest ALTER COLUMN serviceid SET DEFAULT nextval('public.offer_serviceid_seq'::regclass);


--
-- Name: servicerequest userid; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.servicerequest ALTER COLUMN userid SET DEFAULT nextval('public.offer_userid_seq'::regclass);


--
-- Name: setting id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.setting ALTER COLUMN id SET DEFAULT nextval('public.setting_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: eventattendance eventattendance_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.eventattendance
    ADD CONSTRAINT eventattendance_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: servicerequest offer_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.servicerequest
    ADD CONSTRAINT offer_pkey PRIMARY KEY (id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: serviceattendance serviceattendance_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.serviceattendance
    ADD CONSTRAINT serviceattendance_pkey PRIMARY KEY (id);


--
-- Name: setting setting_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public.setting
    ADD CONSTRAINT setting_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_unqemail; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_unqemail UNIQUE (email);


--
-- Name: user user_unqphone; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_unqphone UNIQUE (phonenumber);


--
-- Name: user user_unqusername; Type: CONSTRAINT; Schema: public; Owner: newuser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_unqusername UNIQUE (username);


--
-- PostgreSQL database dump complete
--

