# Instruções do projeto

## Branches e commits

- **Nunca criar uma branch nova.** Todo trabalho é feito direto na `main`.
- **Sempre dividir as mudanças no maior número de commits possível.** Um
  commit por mudança lógica e atômica — nunca agrupar coisas diferentes
  (ex.: uma mudança de copy e uma mudança de layout) num único commit.
- Usar Conventional Commits nas mensagens (`feat:`, `fix:`, `docs:`, `chore:`,
  etc.), como já vem sendo feito neste repositório.
- O autor dos commits deve ser sempre o usuário — usar a identidade git já
  configurada na máquina, nunca configurar ou trocar para uma identidade do
  Claude.

  **Observação:** por política da ferramenta (Claude Code), toda mensagem de
  commit gerada em uma sessão recebe automaticamente um rodapé
  `Co-Authored-By: Claude ...`. Essa linha não pode ser omitida a pedido do
  projeto — é um requisito da própria ferramenta, independente do autor do
  commit (que continua sendo o usuário).
