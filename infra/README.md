# infra

## Gotchas

### Name Servers on Registered Domain

If hosted zone is destroyed and re-provisioned, new name server records are associated with the new hosted zone.
However, the domain name (AWS Route 53 is also used as the domain name registrar) still has the previous name server
records associated with it. Head to *Route 53 > Registered domains > blairnangle.com > Add or edit name servers* and add
the newly associated name server records from the hosted zone to the registered domain.

### DNS TXT validation records

If provisioning infrastructure from a local machine and using a `terraform.tfvars` file, the format of the variable
values may need to change relative to what's stored in GitHub Actions Secrets.

E.g., `zoho_spf_txt_verification_record_value` would need to be single-quoted in GitHub Actions but can follow
standard `tfvars` double-quoting convention locally:

```terraform
zoho_spf_txt_verification_record_value = "v=spf1 include:zoho.eu ~all"
```

See [this blog post](https://blairnangle.com/blog/string-enclosed-secrets-github-actions) for more context.
