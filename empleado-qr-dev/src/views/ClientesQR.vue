<script setup>
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

// Estado de los inputs del formulario
const nombre = ref('');
const apellidoPaterno = ref('');
const apellidoMaterno = ref('');
const fechaNacimiento = ref(null);
const rfc = ref('');

// Estado de la tarjeta
const tarjetaGenerada = ref(null);

const generarTarjeta = () => {
    const nom = nombre.value.trim().toUpperCase();
    const paterno = apellidoPaterno.value.trim().toUpperCase();
    const materno = apellidoMaterno.value.trim().toUpperCase();
    const rfcManual = rfc.value.trim().toUpperCase();

    if (!nom || !paterno || !rfcManual) return;

    let fechaTexto = '';
    if (fechaNacimiento.value) {
        const d = new Date(fechaNacimiento.value);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        fechaTexto = `${dd}/${mm}/${yyyy}`;
    }

    // Texto limpio sin formato de contacto (vCard eliminado)
    // Asegúrate de que esté como string literal limpio, SIN encodeURIComponent()
    const contenidoPlano = `NOMBRE: ${nom} ${paterno} ${materno}\nRFC: ${rfcManual}\nFECHA: ${fechaTexto}`;

    tarjetaGenerada.value = {
        nombre: nom,
        apellidos: `${paterno} ${materno}`.trim(),
        puesto: 'Empleada',
        rfc: rfcManual,
        qrData: contenidoPlano // Pasa la cadena directa
    };
};
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <!-- Formulario -->
        <div class="col-span-12 lg:col-span-7">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-lg uppercase">Generar el RFC de una persona</div>

                <div class="flex flex-col gap-2">
                    <label for="nombre">Nombre(s):</label>
                    <InputText id="nombre" v-model="nombre" placeholder="Ej. Susana" fluid />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="paterno">Apellido Paterno:</label>
                    <InputText id="paterno" v-model="apellidoPaterno" placeholder="Ej. Rojas" fluid />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="materno">Apellido Materno:</label>
                    <InputText id="materno" v-model="apellidoMaterno" placeholder="Ej. Merida" fluid />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="fecha">Fecha Nacimiento:</label>
                    <DatePicker id="fecha" v-model="fechaNacimiento" dateFormat="dd/mm/yy" showIcon fluid />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="rfc">RFC:</label>
                    <InputText id="rfc" v-model="rfc" placeholder="Ej. ROMS920822MCSRRS09" class="uppercase" fluid />
                </div>

                <div class="mt-2">
                    <Button label="GENERAR" severity="success" class="w-full sm:w-64 font-bold"
                        @click="generarTarjeta" />
                </div>
            </div>
        </div>

        <!-- Tarjeta Digital -->
        <div class="col-span-12 lg:col-span-5">
            <div class="card flex flex-col items-center min-h-full">
                <div class="font-semibold text-lg uppercase self-start mb-4">Tarjeta Digital</div>

                <div v-if="tarjetaGenerada"
                    class="w-full max-w-xs rounded-xl overflow-hidden shadow-lg border border-surface-200 dark:border-surface-700 bg-white text-slate-800 flex flex-col justify-between">

                    <!-- Encabezado azul -->
                    <div class="bg-[#004b87] text-white p-5 pb-14 relative text-center rounded-b-[40%]">
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-8 h-8 rotate-45 bg-white flex items-center justify-center rounded-sm">
                                <div class="w-4 h-4 rounded-full bg-[#004b87]"></div>
                            </div>
                            <div class="text-left ml-1">
                                <div class="font-bold text-sm tracking-wider uppercase">Your Company</div>
                                <div class="text-xs text-blue-200">Slogan Goes Here</div>
                            </div>
                        </div>
                    </div>

                    <!-- Avatar circular -->
                    <div class="relative -mt-12 flex justify-center">
                        <div class="w-24 h-24 rounded-full bg-white p-1.5 shadow-md">
                            <div
                                class="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-[#002855]">
                                <i class="pi pi-user text-5xl"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Datos y QR -->
                    <div class="px-6 py-4 text-center flex flex-col items-center">
                        <div class="font-bold text-lg text-[#002855] leading-tight">
                            {{ tarjetaGenerada.nombre }}<br />
                            {{ tarjetaGenerada.apellidos }}
                        </div>
                        <div class="text-slate-500 text-sm mt-1">{{ tarjetaGenerada.puesto }}</div>

                        <div class="font-semibold text-sm text-slate-700 mt-3">
                            ID : {{ tarjetaGenerada.rfc }}
                        </div>

                        <!-- Código QR con texto plano -->
                        <div class="mt-4 p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <QrcodeVue :value="tarjetaGenerada.qrData" :size="160" :margin="2" level="M"
                                render-as="canvas" background="#ffffff" foreground="#000000" />
                        </div>
                    </div>

                    <!-- Pie azul -->
                    <div class="h-6 bg-gradient-to-r from-[#002855] via-[#004b87] to-[#0077cc]"></div>
                </div>

                <div v-else class="flex flex-col items-center justify-center text-muted-color py-16 text-center">
                    <i class="pi pi-qrcode text-5xl mb-3 opacity-50"></i>
                    <p>Ingresa los datos y presiona <strong>GENERAR</strong> para crear la credencial.</p>
                </div>
            </div>
        </div>
    </div>
</template>