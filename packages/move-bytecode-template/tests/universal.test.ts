// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs, fromHex, toHex } from '@mysten/bcs';
import { assert, describe, expect, it } from 'vitest';

import * as template from '../pkg';

describe('move-binary-template', () => {
	it('.version() should return 0.1.1', () => {
		expect(template.version()).toEqual('0.1.1');
	});

	it('should deserialize big u64 values', () => {
		let bytes = u64ModuleBytes(); // u64
		let de = template.deserialize(bytes);
		let ser = template.serialize(de);
		let de2 = template.deserialize(ser); // deserialize again

		expect(de).toEqual(de2);
		expect(ser).toEqual(bytes);
	});

	it('should de / ser', () => {
		let bytes = pokemonBytes();
		let de = template.deserialize(bytes);
		let ser = template.serialize(de);

		expect(ser).toEqual(bytes);
	});

	it('should update identifiers', () => {
		let patched = template.update_identifiers(pokemonBytes(), {
			Stats: 'PokeStats',
			pokemon_v1: 'capymon',
			new: 'capy_new',
			speed: 'capy_speed',
		});

		let de = template.deserialize(patched);

		expect(de.identifiers.includes('PokeStats')).toBeTruthy();
		expect(de.identifiers.includes('capymon')).toBeTruthy();
		expect(de.identifiers.includes('capy_new')).toBeTruthy();
		expect(de.identifiers.includes('capy_speed')).toBeTruthy();
	});

	it('should update constants', () => {
		let _constants = template.get_constants(coinTemplateBytes());
		let updatedConsts;

		// Update `6u8` to `3u8`
		updatedConsts = template.update_constants(
			coinTemplateBytes(),
			bcs.u8().serialize(3).toBytes(),
			bcs.u8().serialize(6).toBytes(),
			'U8',
		);

		updatedConsts = template.update_constants(
			updatedConsts,
			bcs.string().serialize('MCN').toBytes(),
			bcs.string().serialize('TMPL').toBytes(),
			'Vector(U8)',
		);

		expect(
			template
				.get_constants(updatedConsts)
				.find((c) => toHex(c.value_bcs) === bcs.string().serialize('TMPL').toHex()),
		).toBeFalsy();

		console.log(
			template
				.get_constants(updatedConsts)
				.find((c) => toHex(c.value_bcs) === bcs.string().serialize('MCN').toHex()),
		);
	});

	it('should not update constants if there is an expected_value value miss-match', () => {
		let bytesBefore = coinTemplateBytes();
		expect(() => {
			let bytesAfter = template.update_constants(
				bytesBefore,
				bcs.u8().serialize(8).toBytes(), // new value
				bcs.u8().serialize(0).toBytes(), // incorrect expected current value (it should be 6)
				'U8', // expected type
			);

			// If they are equal the produced bytecode should be the same
			assert(template.get_constants(bytesBefore) === template.get_constants(bytesAfter));
		});
	});

	it('should not update constants if there is an expected_type miss-match', () => {
		let bytesBefore = coinTemplateBytes();
		expect(() => {
			let bytesAfter = template.update_constants(
				bytesBefore,
				bcs.u8().serialize(8).toBytes(), // new value
				bcs.u8().serialize(6).toBytes(), // expected current value
				'Vector(U8)', // incorrect expected type (it should be U8)
			);

			// If they are equal the produced bytecode should be the same
			assert(template.get_constants(bytesBefore) === template.get_constants(bytesAfter));
		});
	});
	it('should fail on incorrect identifier', () => {
		expect(() => {
			template.update_identifiers(pokemonBytes(), { Stats: '123123PokeStats' });
		}).toThrow();

		expect(() => {
			template.update_identifiers(pokemonBytes(), { Stats: '\\aaa' });
		}).toThrow();

		expect(() => {
			template.update_identifiers(pokemonBytes(), { Stats: '+say_hello' });
		}).toThrow();
	});
});

function pokemonBytes() {
	return fromHex(
		'a11ceb0b060000000a01000202020403064b055139078a019b0108a5022006c5021e0ae302140cf702f7030dee0610000a000007000009000100000d00010000020201000008030400000b050100000506010000010607000004060700000c060700000e060700000f06070000060607000010060800000309050000070a050004060800060800020201030603030303030308020202020202020a0201080000010608000102010a02020708000301070800010104030303030553746174730661747461636b0664616d6167650b64656372656173655f687007646566656e7365026870056c6576656c086c6576656c5f7570036e65770f706879736963616c5f64616d6167650a706f6b656d6f6e5f7631077363616c696e670e7370656369616c5f61747461636b0e7370656369616c5f64616d6167650f7370656369616c5f646566656e73650573706565640574797065730000000000000000000000000000000000000000000000000000000000000000030800ca9a3b0000000003080000000000000000030801000000000000000002080503010204020c020e020f020602100a02000100000b320a0331d92604090a0331ff250c04050b090c040b04040e05140b01010b00010701270a023100240419051f0b01010b00010702270a00100014340b00100114340b01100214340b02340b03340700110202010100000b320a0331d92604090a0331ff250c04050b090c040b04040e05140b01010b00010701270a023100240419051f0b01010b00010702270a00100014340b00100314340b01100414340b02340b03340700110202020000000c2a0602000000000000000b0018060100000000000000180605000000000000001a060200000000000000160c070a050b01180b021a0c060b070b03180b06180632000000000000001a0602000000000000000a0518160c080a050b041806ff000000000000001a0c090b080b0918060100000000000000180b051a0203010000050d0b00340700180b010b020b030b040b050b060b071200020401000005020700020501000005040b00100514020601000005040b00100114020701000005040b00100214020801000005040b00100314020901000005040b00100414020a01000005040b00100614020b01000005040b00100014020c01000005040b00100714020d01000005140a010a0010051424040b0600000000000000000b000f051505130a001005140b01170b000f0515020e01000005090a001000143101160b000f0015020006000100020003000400000005000700',
	);
}

function coinTemplateBytes() {
	return fromHex(
		'a11ceb0b060000000a01000c020c1e032a1c044608054e46079401a10108b50260069503390ace03050cd30329000e010b0206020f021002110002020001010701000002000c01000102030c01000104040200050507000009000100010a01040100020706070102030c0b01010c040d08090001030205030a030202080007080400010b02010800010805010b01010900010800070900020a020a020a020b01010805070804020b030109000b02010900010608040105010b03010800020900050c436f696e4d65746164617461064f7074696f6e0854454d504c4154450b5472656173757279436170095478436f6e746578740355726c04636f696e0f6372656174655f63757272656e63790b64756d6d795f6669656c6404696e6974046e6f6e65066f7074696f6e0f7075626c69635f7472616e736665720673656e6465720874656d706c617465087472616e736665720a74785f636f6e746578740375726c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020201060a020504544d504c0a020e0d54656d706c61746520436f696e0a021a1954656d706c61746520436f696e204465736372697074696f6e00020108010000000002130b00070007010702070338000a0138010c020a012e110438020b020b012e110438030200',
	);
}

function u64ModuleBytes() {
	return fromHex(
		'a11ceb0b060000000901000802080a03124e04600e056e5707c5019e0108e30220068303090c8c03ed0400120008000d001401000701000002010700000200000000050100000006010000000301000000040100000009020000000c0000000011000300000f0004000010000500000e0006000107070d0100010b0e0d01000213140600030a150701000b0c0c0c0b100c100b120c120e0c0103020303020302010b000102010b00010d010b00010e0108010003030303030302030404040304020b000102030102010b00010900010900020b00010d03010d020b00010e03010e0308010a0203010a0201070a0900064f7074696f6e06537472696e670b626974776973655f6e6f740464696666136469766964655f616e645f726f756e645f7570036d6178036d696e046e6f6e65066f7074696f6e03706f77077265766572736504736f6d65047371727406737472696e6709746f5f737472696e670a7472795f61735f7531360a7472795f61735f753332097472795f61735f753803753634047574663806766563746f7200000000000000000000000000000000000000000000000000000000000000010a020201300a0201000001000007040b0006ffffffffffffffff1d0201010000080f0b000c030b010c040a030a0424040b0b030c02050d0b040c020b020202010000080f0b000c030b010c040a030a0423040b0b030c02050d0b040c020b02020301000008130b000c030b010c040a030a0424040d0b030b04170c0205110b040b03170c020b02020401000008170b000c030b010c040a030a041906000000000000000021040f0b030b041a0c0205150b030b041a060100000000000000160c020b02020501000009250b000c020b010c030601000000000000000c040a033101260423050b0a03310219310021041a0a020b02180c020b0331021a0c0305060b040a02180c040b033101170c0305060b0402060100000a2d0b000c0332000000000000000001000000000000000c0132000000000000000000000000000000000c020b03350c040a01320000000000000000000000000000000022042a050e0a040a020a01162604210b040a020a0116170c040b023101300a01160c0205250b023101300c020b013102300c0105090b023402070100000b0f0b000c020a0206ff0000000000000024040938000c01050d0b023338010c010b0102080100000f0f0b000c020a0206ffff00000000000024040938020c01050d0b024b38030c010b010209010000110f0b000c020a0206ffffffff0000000024040938040c01050d0b024c38050c010b01020a01000013240b000c030a0306000000000000000021040a0700110d0c01052207010c020a0306000000000000000022041d0d020630000000000000000a03060a00000000000000191633440c0b03060a000000000000001a0c03050c0d0238060b02110d0c010b010200',
	);
}
