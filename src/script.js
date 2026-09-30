(() => {
  'use strict';
  const resources = {
    internet:{category:'CONECTIVIDADE',title:'Internet',description:'Ponto de entrada público para acesso ao ChrisLabs CloudOps.',details:['Acesso público ao frontend','Fluxo visual para o Static Web Apps','Camada externa representada no diagrama']},
    staticwebapp:{category:'APPLICATION PLANE',title:'Azure Static Web Apps',description:'Serviço escolhido para hospedar o frontend do ChrisLabs CloudOps.',details:['Plano Free','Hospedagem do site estático','Decisão baseada em custo e adequação ao laboratório']},
    website:{category:'FRONTEND',title:'ChrisLabs CloudOps Console',description:'Interface visual do laboratório de infraestrutura e operações.',details:['HTML sem framework','CSS responsivo e animações','JavaScript para interações e modais']},
    terraform:{category:'INFRASTRUCTURE AS CODE',title:'Terraform',description:'Ferramenta usada para definir e provisionar a infraestrutura Azure como código.',details:['Provisionamento dos recursos','Configuração versionável','Remote state em Azure Storage']},
    storage:{category:'STATE MANAGEMENT',title:'Azure Storage',description:'Backend remoto usado para armazenar o Terraform State.',details:['Terraform Remote State','Backend AzureRM','Estado fora da estação local']},
    resourcegroup:{category:'AZURE FOUNDATION',title:'Resource Group',description:'Contêiner lógico para organizar os recursos do laboratório.',details:['Organização central dos recursos','Gerenciado como parte da infraestrutura','Base para os componentes Azure']},
    vnet:{category:'NETWORK LAB',title:'Azure Virtual Network',description:'Fundação de rede do laboratório Azure.',details:['Segmentação de rede','Subnets dedicadas','Integração com Network Security Groups']},
    appsubnet:{category:'NETWORK LAB',title:'snet-app',description:'Subnet dedicada à camada de aplicação no desenho do laboratório.',details:['Segmentação lógica','NSG associado','Gerenciada pela configuração do projeto']},
    managementsubnet:{category:'NETWORK LAB',title:'snet-management',description:'Subnet dedicada à camada de gerenciamento no desenho do laboratório.',details:['Separação lógica','NSG associado','Parte da VNet do laboratório']},
    code:{category:'TERRAFORM WORKFLOW',title:'CODE',description:'Definição declarativa da infraestrutura.',details:['Arquivos Terraform','Infraestrutura versionável','Mudanças revisáveis']},
    validate:{category:'TERRAFORM WORKFLOW',title:'VALIDATE',description:'Validação da configuração antes do planejamento.',details:['Formatação e consistência','Validação da configuração','Falhas detectadas antes do apply']},
    plan:{category:'TERRAFORM WORKFLOW',title:'PLAN',description:'Revisão das mudanças propostas antes da execução.',details:['Visualização das mudanças','Revisão antes de modificar recursos','Etapa de controle']},
    apply:{category:'TERRAFORM WORKFLOW',title:'APPLY',description:'Execução das mudanças aprovadas.',details:['Provisionamento no Azure','Atualização do state','Aplicação da configuração']},
    azure:{category:'CLOUD PLATFORM',title:'Microsoft Azure',description:'Plataforma de nuvem que hospeda os recursos do projeto.',details:['Static Web Apps','Storage','Resource Group','Networking']}
  };
  const $ = s => document.querySelector(s);
  const tooltip = $('#tooltip'); const modal = $('#resourceModal'); const close = $('#modalClose');
  const category = $('#modalCategory'); const title = $('#modalTitle'); const desc = $('#modalDescription'); const details = $('#modalDetails'); const status = $('#modalStatus');
  const getResource = el => resources[el?.dataset?.resource];
  function positionTooltip(el){const r=el.getBoundingClientRect();const w=tooltip.offsetWidth,h=tooltip.offsetHeight;let left=r.left+r.width/2-w/2;let top=r.top-h-12;left=Math.max(12,Math.min(left,innerWidth-w-12));if(top<12)top=r.bottom+12;tooltip.style.left=`${left}px`;tooltip.style.top=`${top}px`;}
  function showTooltip(e){const r=getResource(e.currentTarget);if(!r||!tooltip)return;tooltip.innerHTML=`<b>${r.title}</b><span>${r.description}</span>`;tooltip.classList.add('visible');tooltip.setAttribute('aria-hidden','false');requestAnimationFrame(()=>positionTooltip(e.currentTarget));}
  function hideTooltip(){if(!tooltip)return;tooltip.classList.remove('visible');tooltip.setAttribute('aria-hidden','true');}
  function openModal(el){const r=getResource(el);if(!r||!modal)return;hideTooltip();category.textContent=r.category;title.textContent=r.title;desc.textContent=r.description;details.innerHTML='<b>Utilização no projeto</b>';const ul=document.createElement('ul');r.details.forEach(x=>{const li=document.createElement('li');li.textContent=x;ul.appendChild(li);});details.appendChild(ul);status.textContent='IMPLEMENTADO';modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';close?.focus();}
  function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  document.querySelectorAll('[data-resource]').forEach(el=>{el.addEventListener('mouseenter',showTooltip);el.addEventListener('mouseleave',hideTooltip);el.addEventListener('focus',showTooltip);el.addEventListener('blur',hideTooltip);el.addEventListener('click',()=>openModal(el));});
  close?.addEventListener('click',closeModal);document.querySelector('[data-close-modal]')?.addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});addEventListener('scroll',hideTooltip,{passive:true});addEventListener('resize',hideTooltip);
  const io=('IntersectionObserver' in window)?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12}):null;document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));
  console.info(`ChrisLabs CloudOps UI: ${document.querySelectorAll('[data-resource]').length} componentes interativos carregados.`);
})();
