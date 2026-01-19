// Fonctions de calcul de base
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return b !== 0 ? a / b : 'Erreur'; }

// Validation : L'email doit finir par @company.com
function isValidCorporateEmail(email) {
    return email && email.endsWith('@company.com');
}

function updateEmailStatus(email) {
    const el = document.getElementById('email-status');
    if (!email) {
        el.textContent = '';
    } else if (isValidCorporateEmail(email)) {
        el.textContent = 'Email valide';
        el.style.color = 'green';
    } else {
        el.textContent = 'Doit se terminer par @company.com';
        el.style.color = 'red';
    }
}

// Règle : Addition bloquée si l'email est invalide
function isCalculationAllowed() {
    const email = document.getElementById('input-email').value;
    return !email || isValidCorporateEmail(email);
}

function displayResult(value) {
    document.getElementById('output').textContent = value;
}

// Écouteur sur l'email
document.getElementById('input-email').addEventListener('input', (e) => {
    updateEmailStatus(e.target.value);
});

// Bouton Addition (avec protection)
document.getElementById('btn-add').addEventListener('click', () => {
    if (!isCalculationAllowed()) {
        displayResult('Erreur: Email invalide');
        return;
    }
    const a = parseFloat(document.getElementById('input-a').value) || 0;
    const b = parseFloat(document.getElementById('input-b').value) || 0;
    displayResult(add(a, b));
});

// Autres boutons (sans protection)
['sub', 'mul', 'div'].forEach(op => {
    document.getElementById(`btn-${op}`).addEventListener('click', () => {
        const a = parseFloat(document.getElementById('input-a').value) || 0;
        const b = parseFloat(document.getElementById('input-b').value) || 0;
        let result;
        switch (op) {
            case 'sub': result = sub(a, b); break;
            case 'mul': result = mul(a, b); break;
            case 'div': result = div(a, b); break;
        }
        displayResult(result);
    });
});
