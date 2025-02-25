<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        <slot name="header">Modal title</slot>
                    </h5>
                  
                </div>
                <div class="modal-body border-0">
                    <slot name="body"><p>Modal body text goes here.</p></slot>
                </div>
                <div class="modal-footer border-0">
                    <slot name="footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped></style>
