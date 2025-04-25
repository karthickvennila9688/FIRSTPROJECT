const fieldItems = document.querySelectorAll('.field-item');
const middlePanel = document.querySelector('.middle-panel .section-body');
const rightPanel = document.querySelector('.right-panel');
const saveButton = document.getElementById('saveBtn');
const deleteSelectedBtn = document.getElementById('deleteSelected');

const formFields = [];

fieldItems.forEach(item => {
  item.addEventListener('click', () => {
    const label = item.childNodes[0].nodeValue.trim();
    const type = item.innerText.split('\n').pop().trim().toLowerCase();

    const fieldData = {
      label,
      type,
      required: true,
      description: '',
      help: ''
    };

    formFields.push(fieldData);
    addFieldToMiddlePanel(fieldData);
    showProperties(fieldData);
  });
});

function addFieldToMiddlePanel(fieldData) {
  const newField = document.createElement('div');
  newField.classList.add('field-group', 'field-row');

  newField.style.display = 'flex';
  newField.style.justifyContent = 'space-between';
  newField.style.alignItems = 'center';
  newField.style.padding = '5px 10px';
  newField.style.border = '1px solid #ccc';
  newField.style.borderRadius = '5px';
  newField.style.marginBottom = '10px';

  newField.innerHTML = `
    <input type="checkbox" class="select-field" style="margin-right: 10px;">
    <div class="field-label" style="flex: 1; cursor: pointer;">
      <div class="field-name">${fieldData.label}</div>
      <div class="field-type">${fieldData.type}</div>
    </div>
  `;

  newField.querySelector('.field-label').addEventListener('click', () => {
    showProperties(fieldData);
  });

  middlePanel.appendChild(newField);
}

function showProperties(fieldData) {
  rightPanel.innerHTML = `
    <h3>Field Properties</h3>
    <label>Field Label</label>
    <input type="text" value="${fieldData.label}" id="labelInput">

    <label>Description</label>
    <textarea id="descInput">${fieldData.description}</textarea>

    <label>In-Line Help</label>
    <textarea id="helpInput">${fieldData.help}</textarea>

    <div class="checkbox-label">
      <input type="checkbox" id="reqCheck" ${fieldData.required ? 'checked' : ''}>
      <span>Mark As Required</span>
    </div>
  `;

  document.getElementById('labelInput').addEventListener('input', e => fieldData.label = e.target.value);
  document.getElementById('descInput').addEventListener('input', e => fieldData.description = e.target.value);
  document.getElementById('helpInput').addEventListener('input', e => fieldData.help = e.target.value);
  document.getElementById('reqCheck').addEventListener('change', e => fieldData.required = e.target.checked);
}

// ✅ Common delete button – only delete checked rows
deleteSelectedBtn.addEventListener('click', () => {
  const selectedCheckboxes = middlePanel.querySelectorAll('.select-field:checked');

  if (selectedCheckboxes.length === 0) {
    alert("Please select at least one field to delete.");
    return;
  }

  selectedCheckboxes.forEach(checkbox => {
    const row = checkbox.closest('.field-group');
    const label = row.querySelector('.field-name').innerText;

    const index = formFields.findIndex(f => f.label === label);
    if (index !== -1) formFields.splice(index, 1);

    row.remove();
  });

  rightPanel.innerHTML = '';
});

// Save form preview
saveButton.addEventListener('click', () => {
  const existing = document.getElementById('formPreview');
  if (existing) existing.remove();

  const preview = document.createElement('div');
  preview.id = 'formPreview';
  preview.innerHTML = `<h2 style="padding:10px;">Form Preview</h2>`;
  preview.style.padding = "20px";
  preview.style.background = "#ffffff";
  preview.style.borderTop = "2px solid #ccc";

  formFields.forEach(field => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.style.marginBottom = '15px';

    const label = document.createElement('label');
    label.innerText = field.label + (field.required ? ' *' : '');
    label.style.display = 'block';
    label.style.marginBottom = '5px';

    let input;
    if (field.type.includes('text') || field.type.includes('long')) {
      input = document.createElement('textarea');
      input.rows = 3;
    } else if (field.type.includes('date')) {
      input = document.createElement('input');
      input.type = 'date';
    } else if (field.type.includes('checkbox')) {
      input = document.createElement('div');
      input.innerHTML = `
        <label><input type="checkbox"> Option A</label><br>
        <label><input type="checkbox"> Option B</label>
      `;
    } else if (field.type.includes('pull')) {
      input = document.createElement('select');
      input.innerHTML = `<option>Option 1</option><option>Option 2</option>`;
      if (field.type.includes('multi')) input.multiple = true;
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    preview.appendChild(fieldWrapper);
  });

  document.body.appendChild(preview);
  preview.scrollIntoView({ behavior: 'smooth' });
});
