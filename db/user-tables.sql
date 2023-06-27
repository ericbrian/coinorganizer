
CREATE TABLE public.user (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(50),
    first_name character varying(50),
    last_name character varying(50),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);

ALTER TABLE public.user OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;

ALTER TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public."user_id_seq"'::regclass);

ALTER TABLE ONLY public.user
    ADD CONSTRAINT "user_email_key" UNIQUE (email);

ALTER TABLE ONLY public.user
    ADD CONSTRAINT "user_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public.user
    ADD CONSTRAINT "user_username_key" UNIQUE (username);

CREATE TABLE public.refresh_token (
    id integer NOT NULL,
    token text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer
);

ALTER TABLE public.refresh_token OWNER TO postgres;

CREATE SEQUENCE public.refresh_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.refresh_token_id_seq OWNER TO postgres;

ALTER SEQUENCE public.refresh_token_id_seq OWNED BY public.refresh_token.id;

ALTER TABLE ONLY public.refresh_token ALTER COLUMN id SET DEFAULT nextval('public.refresh_token_id_seq'::regclass);

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT "refresh_token_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT "Collections_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE CASCADE;

 ALTER TABLE ONLY public.role
    ADD CONSTRAINT "roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE CASCADE;
