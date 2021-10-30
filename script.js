let upgradeBut = document.querySelector('.upgrade-button');
let modalLicBg = document.querySelector('.modal-lic-bg');
let modalLic = document.querySelector('.modal-lic');
// let modalOtherBg = document.querySelector('.modal-other-bg');
// let modalOther = document.querySelector('.modal-other');

//  ------------- MODALS ----------------

modalLicBg.addEventListener('click', (e) => {
  if (e.target == modalLicBg && e.target != modalLic) {
    modalLicBg.style.display = 'none';
  }
});

upgradeBut.addEventListener('click', () => {
  modalLicBg.style.display = 'grid';
});



// -------------------------------

let sysName = document.querySelector('#name');
let sysId = document.querySelector('#id');
let addSystem = document.querySelector('#addSystem');
let systemSection = document.querySelector('.system-section');

addSystem.addEventListener('click', () => {
  if (sysName.value != '' && sysId.value != '') {
    let system = document.createElement('div');
    system.classList.add('system');

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = year + '/' + month + '/' + day;

    system.innerHTML = `
    <div class="system-block">
      <ul>
        <li class="licenseOpen">
          <i class="fas fa-sort-down"></i><span>${sysName.value}</span>
        </li>
        <li><span>${sysId.value}</span></li>
        <li><span>${newdate}</span></li>
        <li><span class="activeLic">0</span></li>
      </ul>
      <div class="buttons">
        <button class="addLicense">Add License</button>
        <button class="removeSystem">Remove</button>
      </div>
    </div>
    <div class="license">
      <div class="license-title">
        <ul>
          <li><span>Licenses</span></li>
          <li><span>Expires</span></li>
        </ul>
      </div>
      <div class="license-container">
        
      </div>
    </div>
    `;
    systemSection.append(system);
    modalLicBg.style.display = 'none';
    // ---------------- Count --------------------

    let actLic = system.firstElementChild.firstElementChild.lastElementChild.firstElementChild
    let count = 0


    // -------------------------------------------

    // ---------------- Accordion ----------------

    let licenseOp = system.firstElementChild.firstElementChild.firstElementChild
    let arrow = licenseOp.firstElementChild
    let license = system.lastElementChild
    licenseOp.addEventListener('click', () => {
      license.classList.toggle('open-list')
      arrow.classList.toggle('rotate')
    })

    // -------------------------------------------

    //  ----------------- LicenseAdd ----------------

    let addLic = system.firstElementChild.lastElementChild.firstElementChild;
    let removeLic = system.firstElementChild.lastElementChild.lastElementChild;

    addLic.addEventListener('click', () => {
      let modalOtherBg = document.createElement('div')
      modalOtherBg.classList.add('modal-other-bg')
      modalOtherBg.innerHTML = `
      <div class="modal-other">
        <h2>Please fill out the form</h2>
        <div class="modal-input">
          <label class="lbl" for="licName">License Name</label> <br />
          <input type="text" name="name" id="licName" /> <br />
          <label class="lbl" for="licExp">License Expires (Date)</label> <br />
          <input type="text" name="id" id="licExp" /> <br />
        </div>
        <button class="addLicBlock">Add License</button>
      </div>
      `
      document.body.lastElementChild.before(modalOtherBg)
      modalOtherBg.style.display = 'grid'

      let modalOther = modalOtherBg.firstElementChild
      modalOtherBg.addEventListener('click', (e) => {
        if (e.target == modalOtherBg && e.target != modalOther) {
          modalOtherBg.remove()
        }
      });

      let licName = document.querySelector('#licName');
      let licExp = document.querySelector('#licExp');
      let addLicBlock = document.querySelector('.addLicBlock');

      addLicBlock.addEventListener('click', () => {
        if (licName.value != '' && licExp.value != '') {
          let licenseBlock = document.createElement('div');
          licenseBlock.classList.add('license-block');

          licenseBlock.innerHTML = `
          <ul>
            <li>
              <span>${licName.value}</span>
            </li>
            <li>
              <span>${licExp.value}</span>
            </li>
          </ul>
          <button class="removeLic">Remove</button>
          `;
          addLic.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.append(licenseBlock);
          licenseBlock.lastElementChild.addEventListener('click', () => {
            licenseBlock.remove()
            actLic.innerHTML = --count
          });
          actLic.innerHTML = ++count
          modalOtherBg.remove()
        }else {
          alert('Please fill inputs.')
        }
      });
    });

    removeLic.addEventListener('click', () => {
      system.remove();
    });
    sysName.value = ''
    sysId.value = ''
    //  ---------------------------------------------
  }else {
    alert('Please fill inputs.')
  }
});
