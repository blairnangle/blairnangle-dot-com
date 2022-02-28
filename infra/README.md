# infra

## Gotchas

### Name Servers on Registered Domain

If hosted zone is destroyed and re-provisioned, new name server records are associated with the new hosted zone. However,
the domain name (AWS Route 53 is also used as the domain name registrar) still has the previous name server records
associated with it. Head to *Route 53 > Registered domains > blairnangle.com > Add or edit name servers* and add the
newly associated name server records from the hosted zone to the registered domain.
