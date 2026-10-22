# PHP 8.3.36 upgrade

This replaces the temporary PHP 7.4 backport with the official maintained PHP 8.3.36 Apache runtime, pinned by digest. Native legacy workload extensions are compiled on the maintained official base. Application compatibility changes in this PR use CI3-compatible maintained pocketarc/codeigniter 3.4.5 pinned at 795dc3f0411f2101f3b624f71cb19937efd90f37. See the framework/dependency-specific provenance and tests in this repository.

## Application state and deployment

Production application/vendor/configuration state is kept separately at `/var/lib/dokku/security-php83-20261022/<app>` and mounted at `/app`. The image copies no application code or credentials; its build context is allowlisted. Startup refuses to serve without the private app entry point. Existing saved session state remains mounted at `/tmp` from `/var/lib/dokku/security-php-20261022/runtime-tmp/<app>`.

The launcher loads existing Dokku global/app environment scripts, then chooses the maintained PHP executable PATH. Apache listens on 80/5000, keeps worker UID/GID 32767, retains rewrite rules, and denies private/dot paths.

Build off-host on a modern amd64 builder (or emulation-capable modern builder): `docker build --platform linux/amd64 -t php83-runtime .`. Transfer with `docker save`/`docker load`, retain existing service links and session mount, and deploy through Dokku. Do not compile on production EC2 hosts.

**Source deployment constraint:** the `/app` mount pins source/configuration and installed vendor packages. This PR records the compatibility changes applied to that private candidate snapshot, but merging or rebuilding an image alone does not update mounted source. Reconcile this incident override with the normal source/dependency deployment pipeline before the next routine release. Never commit production `.env`, API keys, or private credentials. No database migrations are included.

Existing application encryption keys and private database/API configuration are preserved.

## Validation

The official pinned runtime and required extensions passed CLI and actual Apache SAPI/function checks. Per-repository startup/Apache assets are tested with network-disabled fixtures, including environment loading, worker identity, `.env` denial and failure without the private mount.

Application upgrades were tested against the actual deployed-source variants with production-only vendor dependencies. Framework-specific evidence covers HTTP/login/API behavior, JWT and query-filter compatibility, or CI endpoint/session/database-driver probes. Real-configuration candidates are checked before cutover, including SELECT 1 and relevant schema reads; no data migrations or business-data writes are performed. Complete owner acceptance/load testing remains separate.

## Emergency rollback

Rollback must restore **both** old runtime and old source mount; the runtime and compatibility dependencies must be restored as a matching pair. On the host, replace `<app>` below:

```
sudo dokku docker-options:remove <app> deploy,run --volume=/var/lib/dokku/security-php83-20261022/<app>:/app
sudo dokku docker-options:add <app> deploy,run --volume=/var/lib/dokku/security-php-20261022/<app>:/app
sudo dokku tags:deploy <app> pre-php83-20261022
```

Recheck nginx, session/writable state and auth. Rollback restores EOL PHP, so it is an emergency availability option only.

Tracking: https://github.com/CodeForAfrica/infrastructure-as-code/issues/151
