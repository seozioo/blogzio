FROM postgres:16.13

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    postgresql-server-dev-16 \
    curl \
    ca-certificates \
    libicu-dev && \
    curl -fL -o /tmp/pg_bigm.tar.gz \
    https://github.com/pgbigm/pg_bigm/archive/refs/tags/v1.2-20250903.tar.gz && \
    tar xzf /tmp/pg_bigm.tar.gz -C /tmp && \
    cd /tmp/pg_bigm-1.2-20250903 && \
    make USE_PGXS=1 && \
    make USE_PGXS=1 install && \
    apt-get purge -y build-essential postgresql-server-dev-16 curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* /tmp/*

CMD ["postgres", "-c", "shared_preload_libraries=pg_bigm"]
