import { useEffect, useState } from 'react';
import { FormularioCategoria } from '../components/FormularioCategoria';
import type {Produto} from "../types";
import {ListaProdutos} from "../components/ListaProdutos.tsx";
import {produtoApi} from "../api/api.ts";

export function ProdutosPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    async function carregar() {
        setProdutos(await produtoApi.listar());
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Categorias</h2>
            <ListaProdutos produtos={produtos} />
            <hr />
            <FormularioCategoria onCategoriaCriada={carregar} />
        </div>
    );
}