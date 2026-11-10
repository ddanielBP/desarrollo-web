<script setup>
import { ref, computed } from 'vue';

const productos = ref([]);

// Estado del formulario superior
const nombreInput = ref('');
const cantidadInput = ref(null);
const precioUInput = ref(null);
const editandoCns = ref(null);

// Estado del modal de confirmación de compra
const mostrarTicket = ref(false);
const ticketEmitido = ref({ items: [], subtotal: 0, iva: 0, total: 0, folio: '' });

// Formateador de moneda ($5,200.00)
const formatoMoneda = (valor) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(valor || 0);
};

// Registrar un nuevo producto o guardar cambios si se está editando
const guardarProducto = () => {
    const nombre = nombreInput.value.trim();
    const cant = Number(cantidadInput.value);
    const precio = Number(precioUInput.value);

    if (!nombre || cant <= 0 || precio <= 0) return;

    const precioParcial = cant * precio;

    if (editandoCns.value !== null) {
        const index = productos.value.findIndex((p) => p.cns === editandoCns.value);
        if (index !== -1) {
            productos.value[index] = {
                cns: editandoCns.value,
                nombre,
                precioU: precio,
                cantidad: cant,
                precioP: precioParcial
            };
        }
        editandoCns.value = null;
    } else {
        const nuevoCns = productos.value.length > 0 ? Math.max(...productos.value.map((p) => p.cns)) + 1 : 1;
        productos.value.push({
            cns: nuevoCns,
            nombre,
            precioU: precio,
            cantidad: cant,
            precioP: precioParcial
        });
    }

    nombreInput.value = '';
    cantidadInput.value = null;
    precioUInput.value = null;
};

// Cargar datos del producto en la barra superior para editarlo
const editarProducto = (item) => {
    editandoCns.value = item.cns;
    nombreInput.value = item.nombre;
    cantidadInput.value = item.cantidad;
    precioUInput.value = item.precioU;
};

// Eliminar producto y reajustar consecutivo (Cns)
const eliminarProducto = (cns) => {
    productos.value = productos.value.filter((p) => p.cns !== cns);
    productos.value.forEach((p, idx) => {
        p.cns = idx + 1;
    });
    if (editandoCns.value === cns) {
        editandoCns.value = null;
        nombreInput.value = '';
        cantidadInput.value = null;
        precioUInput.value = null;
    }
};

// Cálculos automáticos de Subtotal, IVA (16%) y Total[cite: 13]
const subtotal = computed(() => productos.value.reduce((acc, item) => acc + item.precioP, 0));
const iva = computed(() => subtotal.value * 0.16);
const total = computed(() => subtotal.value + iva.value);

// Procesar la compra, mostrar el ticket y limpiar la tabla
const realizarCompra = () => {
    if (productos.value.length === 0) return;

    ticketEmitido.value = {
        folio: 'POS-' + Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toLocaleString('es-MX'),
        items: [...productos.value],
        subtotal: subtotal.value,
        iva: iva.value,
        total: total.value
    };

    mostrarTicket.value = true;

    // Vaciar el carrito después de generar la compra
    productos.value = [];
    editandoCns.value = null;
    nombreInput.value = '';
    cantidadInput.value = null;
    precioUInput.value = null;
};
</script>

<template>
    <div class="card p-0 overflow-hidden border border-surface-200 dark:border-surface-700">
        <!-- Encabezado estilo Panel -->
        <div class="bg-surface-100 dark:bg-surface-800 px-6 py-4 border-b border-surface-200 dark:border-surface-700 font-bold text-base uppercase">
            PUNTO DE VENTA (POS)
        </div>

        <div class="p-6 flex flex-col gap-6">
            <!-- Barra Superior de Captura -->
            <div class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
                <div class="flex flex-wrap sm:flex-nowrap flex-1 gap-2 w-full">
                    <InputText v-model="nombreInput" placeholder="Nombre del producto..." class="w-full sm:w-6/12" />
                    <InputNumber v-model="cantidadInput" placeholder="Cant" :min="1" class="w-full sm:w-3/12" fluid />
                    <InputNumber v-model="precioUInput" placeholder="$ Precio U." mode="currency" currency="USD" locale="en-US" class="w-full sm:w-3/12" fluid />
                </div>

                <Button
                    :label="editandoCns !== null ? 'Actualizar' : 'Registrar'"
                    :icon="editandoCns !== null ? 'pi pi-check' : 'pi pi-plus'"
                    severity="success"
                    class="w-full lg:w-auto px-6 font-bold"
                    @click="guardarProducto"
                />
            </div>

            <!-- Tabla de Productos (DataTable de PrimeVue)[cite: 13] -->
            <DataTable
                :value="productos"
                showGridlines
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
                tableStyle="min-width: 50rem"
            >
                <template #empty>
                    <div class="text-center py-4 text-muted-color">No hay productos registrados en la venta actual.</div>
                </template>

                <Column field="cns" header="Cns" sortable style="width: 8%"></Column>
                <Column field="nombre" header="Nombre del Producto" style="width: 42%"></Column>

                <Column field="precioU" header="Precio U." style="width: 15%">
                    <template #body="{ data }">
                        {{ formatoMoneda(data.precioU) }}
                    </template>
                </Column>

                <Column field="cantidad" header="Cant." style="width: 10%; text-align: center"></Column>

                <Column field="precioP" header="Precio P." style="width: 15%">
                    <template #body="{ data }">
                        {{ formatoMoneda(data.precioP) }}
                    </template>
                </Column>

                <Column header="Acciones" style="width: 10%">
                    <template #body="{ data }">
                        <div class="flex items-center gap-1">
                            <Button icon="pi pi-pencil" severity="success" class="!p-2" @click="editarProducto(data)" />
                            <Button icon="pi pi-trash" severity="danger" class="!p-2" @click="eliminarProducto(data.cns)" />
                        </div>
                    </template>
                </Column>
            </DataTable>

            <!-- Barra Inferior de Totales y Botón de Realizar Compra -->
            <div class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900 flex flex-wrap items-center justify-between gap-4">
                <!-- Totales -->
                <div class="flex flex-wrap items-center gap-4 ml-auto">
                    <div class="flex items-center gap-2">
                        <label class="font-medium text-sm">Subtotal:</label>
                        <InputText :value="formatoMoneda(subtotal)" readonly class="w-36 font-semibold bg-surface-100 dark:bg-surface-800" />
                    </div>

                    <div class="flex items-center gap-2">
                        <label class="font-medium text-sm">IVA (16%):</label>
                        <InputText :value="formatoMoneda(iva)" readonly class="w-36 font-semibold bg-surface-100 dark:bg-surface-800" />
                    </div>

                    <div class="flex items-center gap-2">
                        <label class="font-medium text-sm">Total:</label>
                        <InputText :value="formatoMoneda(total)" readonly class="w-36 font-bold bg-surface-100 dark:bg-surface-800" />
                    </div>

                    <!-- Botón Realizar Compra -->
                    <Button
                        label="Realizar Compra"
                        icon="pi pi-shopping-cart"
                        severity="primary"
                        class="font-bold px-5"
                        :disabled="productos.length === 0"
                        @click="realizarCompra"
                    />
                </div>
            </div>
        </div>

        <!-- Modal de Ticket de Compra -->
        <Dialog v-model:visible="mostrarTicket" modal header="Compra Realizada con Éxito" :style="{ width: '26rem' }">
            <div class="flex flex-col gap-3 text-sm">
                <div class="flex justify-between border-b pb-2 border-surface-200 dark:border-surface-700">
                    <span class="font-semibold">Folio: {{ ticketEmitido.folio }}</span>
                    <span class="text-muted-color">{{ ticketEmitido.fecha }}</span>
                </div>

                <div class="flex flex-col gap-2 my-2">
                    <div v-for="item in ticketEmitido.items" :key="item.cns" class="flex justify-between">
                        <span>{{ item.cantidad }}x {{ item.nombre }}</span>
                        <span class="font-medium">{{ formatoMoneda(item.precioP) }}</span>
                    </div>
                </div>

                <div class="border-t pt-2 border-surface-200 dark:border-surface-700 flex flex-col gap-1 text-right">
                    <div>Subtotal: <strong>{{ formatoMoneda(ticketEmitido.subtotal) }}</strong></div>
                    <div>IVA (16%): <strong>{{ formatoMoneda(ticketEmitido.iva) }}</strong></div>
                    <div class="text-base text-primary font-bold mt-1">
                        Total Pagado: {{ formatoMoneda(ticketEmitido.total) }}
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cerrar" icon="pi pi-check" severity="success" @click="mostrarTicket = false" autofocus />
            </template>
        </Dialog>
    </div>
</template>