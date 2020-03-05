# GitHub Action for deploying TrustFramework KeySet secrets

Use this GitHub Action to deploy a TrustFramework KeySet secret into your Azure Active Directory B2C tenant using the [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/api/resources/trustframeworkkeyset?view=graph-rest-beta). If the secret does not yet exist, it will be created. If the secret already exists, it will be replaced with a new version.

For more information on TrustFramework Policies and the Identity Experience Framework, see the [Azure AD B2C documentation](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview).

To authenticate to the Microsoft Graph, you will need to obtain client application credentials using [these instructions](https://docs.microsoft.com/en-us/azure/active-directory-b2c/microsoft-graph-get-started).

## Sample workflow to deploy a secret

```yaml
on: push

env:
  clientId: 00000000-0000-0000-0000-000000000000
  tenant: my-tenant.onmicrosoft.com
  facebookClientSecretKeyContainer: B2C_1A_FacebookSecret

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Upload Facebook Client Secret
      uses: azure-ad-b2c/deploy-trustframework-keyset-secret@v1
      with:
        name: ${{ env.facebookClientSecretKeyContainer }}
        value: ${{ secrets.facebookClientSecret }}
        tenant: ${{ env.tenant }}
        clientId: ${{ env.clientId }}
        clientSecret: ${{ secrets.clientSecret }}
```

## Community Help and Support
Use [Stack Overflow](https://stackoverflow.com/questions/tagged/azure-ad-b2c) to get support from the community. Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before. Make sure that your questions or comments are tagged with [azure-ad-b2c].

If you find a bug in the sample, please raise the issue on [GitHub Issues](https://github.com/azure-ad-b2c/deploy-trustframework-policy/issues).

To provide product feedback, visit the Azure AD B2C [feedback page](https://feedback.azure.com/forums/169401-azure-active-directory?category_id=160596).