# === Hurley Dev Shortcuts ===

# Quick Git commit + push
alias gcp='
if ! git diff --quiet || ! git diff --cached --quiet; then
  git add . &&
  git commit -m "update" &&
  git push origin main &&
  printf "\e[1;32m✅ Git push complete!\e[0m\n" ||
  printf "\e[1;31m❌ Git push failed.\e[0m\n";
else
  printf "\e[1;34mℹ️ Nothing to commit; working tree clean.\e[0m\n";
fi
'

# Append a new section to the development log
alias logadd='echo -e "
## $(date +%F) — Session Notes
### ✅ Done
-
### ⚠️ Issues
-
### 🎯 Next
-
### 📦 Deployments
-
### 💡 Learnings
- " >> ~/Documents/SoccerWorld/DEV_LOG.md'

# Run full project save script
alias saveall="~/Documents/SoccerWorld/save-all.sh"

# Shortcut to run logadd + git push
alias logpush='logadd && gcp'
