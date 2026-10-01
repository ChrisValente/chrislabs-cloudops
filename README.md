# ChrisLabs CloudOps

Projeto de portfólio focado na construção e operação de uma infraestrutura cloud no Microsoft Azure utilizando Infrastructure as Code, automação, networking, CI/CD e conceitos de FinOps.

🌐 **Ambiente online:** https://cloudops.chrislabs.online

## Visão geral

O ChrisLabs CloudOps foi desenvolvido como um laboratório prático para demonstrar conhecimentos fundamentais de infraestrutura e CloudOps no Azure.

O projeto combina infraestrutura provisionada com Terraform, armazenamento remoto do Terraform State, networking segmentado, controles de segurança com Network Security Groups, hospedagem utilizando Azure Static Web Apps e deployment automatizado através do GitHub Actions.

A arquitetura foi construída com atenção especial à simplicidade operacional e ao controle de custos.

## Arquitetura

src/assets/images/chrislabs-cloudops-architecture.png

### Fluxo da solução

```text
Código local
    │
    ├── Terraform ──► Azure Infrastructure
    │
    └── Git
         │
         ▼
       GitHub
         │
         ▼
   GitHub Actions
         │
         ▼
 Azure Static Web Apps
         │
         ▼
 cloudops.chrislabs.online
```

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| Microsoft Azure | Plataforma cloud |
| Terraform | Infrastructure as Code |
| Azure Storage | Remote State do Terraform |
| Azure Virtual Network | Fundação de networking |
| Azure Subnets | Segmentação da rede |
| Network Security Groups | Controles de segurança de rede |
| Azure Static Web Apps | Hospedagem do frontend |
| Azure DNS | Resolução do domínio personalizado |
| Git | Controle de versão |
| GitHub | Repositório do projeto |
| GitHub Actions | CI/CD |
| HTML / CSS / JavaScript | CloudOps Console |

## Infrastructure as Code

A infraestrutura principal é definida utilizando Terraform.

O projeto utiliza tags comuns para identificação e governança dos recursos:

```hcl
Project     = "ChrisLabs-CloudOps"
Environment = "Lab"
ManagedBy   = "Terraform"
Owner       = "Christian-Valente"
CostCenter  = "Personal-Lab"
```

Entre os componentes provisionados estão:

- Resource Group
- Azure Virtual Network
- Subnets
- Network Security Groups
- associações entre NSGs e subnets
- Azure Static Web App

### Organização principal

```text
rg-chrislabs-cloudops-lab
│
├── vnet-chrislabs-cloudops-lab
│   │
│   ├── snet-app
│   │   └── nsg-chrislabs-app-lab
│   │
│   └── snet-management
│       └── nsg-chrislabs-management-lab
│
└── swa-chrislabs-cloudops-lab
```

## Networking

A rede virtual utiliza o seguinte espaço de endereçamento:

```text
VNet
10.10.0.0/16

├── snet-app
│   └── 10.10.1.0/24
│
└── snet-management
    └── 10.10.2.0/24
```

Cada subnet possui um Network Security Group dedicado:

```text
snet-app
    │
    └── nsg-chrislabs-app-lab

snet-management
    │
    └── nsg-chrislabs-management-lab
```

Essa organização demonstra segmentação lógica e separação dos componentes de aplicação e gerenciamento.

## Terraform Remote State

O Terraform State utiliza backend remoto no Azure Storage.

```text
Resource Group:
rg-chrislabs-tfstate-lab

Storage Account:
stchrislabstfstate01

Container:
tfstate

State:
chrislabs-cloudops.tfstate

Backend:
azurerm

Authentication:
Azure AD
```

Configuração:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-chrislabs-tfstate-lab"
    storage_account_name = "stchrislabstfstate01"
    container_name       = "tfstate"
    key                  = "chrislabs-cloudops.tfstate"
    use_azuread_auth     = true
  }
}
```

O state local e seus backups são excluídos do versionamento através do `.gitignore`.

## Azure Static Web Apps

O frontend é hospedado utilizando Azure Static Web Apps no plano Free.

```text
Resource:
swa-chrislabs-cloudops-lab

Region:
East US 2

SKU:
Free
```

A aplicação é publicada em:

**https://cloudops.chrislabs.online**

O domínio personalizado utiliza Azure DNS e HTTPS.

## CI/CD

O deployment da interface é automatizado através do GitHub Actions.

Fluxo:

```text
Alteração em src/
       │
       ▼
   git commit
       │
       ▼
    git push
       │
       ▼
GitHub / main
       │
       ▼
GitHub Actions
       │
       ▼
Azure Static Web Apps
       │
       ▼
cloudops.chrislabs.online
```

O pipeline elimina a necessidade de publicação manual do frontend após alterações versionadas.

## FinOps

Controle de custos foi um requisito importante durante o desenvolvimento.

A abordagem inicial considerou Azure App Service. Durante o laboratório, restrições de quota e a análise de custo/adequação levaram à adoção do Azure Static Web Apps no plano Free para o frontend.

A arquitetura final procura manter somente os recursos necessários para demonstrar os conceitos técnicos do laboratório.

## Segurança

Algumas práticas adotadas pelo projeto:

- Terraform State remoto
- autenticação Azure AD para acesso ao backend Terraform
- Network Security Groups separados por subnet
- arquivos `*.tfstate` ignorados pelo Git
- arquivos `*.tfvars` ignorados pelo Git
- arquivos `.env`, `.pem` e `.key` ignorados pelo Git
- secrets do deployment armazenados no GitHub Actions
- HTTPS no domínio público

## Estrutura do repositório

```text
chrislabs-cloudops/
│
├── .github/
│   └── workflows/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── chrislabs-cloudops-architecture.png
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── terraform/
│   ├── backend.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── providers.tf
│   ├── security.tf
│   ├── static-web-app.tf
│   └── variables.tf
│
├── .gitignore
└── README.md
```

## Conceitos demonstrados

O laboratório demonstra de forma prática:

- Microsoft Azure
- Infrastructure as Code
- Terraform
- Terraform Remote State
- Azure networking
- segmentação com subnets
- Network Security Groups
- Azure DNS
- custom domains
- HTTPS
- Git
- GitHub
- GitHub Actions
- CI/CD
- Static Web Apps
- FinOps
- documentação de arquitetura

## Status

**ChrisLabs CloudOps v1